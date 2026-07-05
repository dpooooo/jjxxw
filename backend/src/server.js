import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 4000);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://127.0.0.1:5173" }));
app.use(express.json({ limit: "2mb" }));

const idParam = z.object({ id: z.coerce.number().int().positive() });

const postSchema = z.object({
  title: z.string().min(3).max(120),
  summary: z.string().max(500).optional(),
  content: z.string().min(10),
  label: z.string().max(24).optional(),
  contactName: z.string().min(1).max(40),
  phone: z.string().min(6).max(30),
  password: z.string().max(80).optional(),
  categoryId: z.number().int().positive(),
  regionId: z.number().int().positive(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "EXPIRED"]).optional(),
  pinned: z.boolean().optional()
});

const categorySchema = z.object({
  slug: z.string().min(2).max(40).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(40),
  description: z.string().max(200).optional(),
  sortOrder: z.number().int().optional()
});

const regionSchema = z.object({
  name: z.string().min(2).max(40),
  sortOrder: z.number().int().optional()
});

const articleSchema = z.object({
  title: z.string().min(3).max(120),
  content: z.string().min(10),
  published: z.boolean().optional()
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, name: "九江信息网 API" });
});

app.get("/api/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/categories", async (req, res, next) => {
  try {
    const data = categorySchema.parse(req.body);
    const category = await prisma.category.create({ data });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/categories/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = categorySchema.partial().parse(req.body);
    const category = await prisma.category.update({ where: { id }, data });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/categories/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    await prisma.category.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get("/api/regions", async (_req, res, next) => {
  try {
    const regions = await prisma.region.findMany({ orderBy: { sortOrder: "asc" } });
    res.json(regions);
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/regions", async (req, res, next) => {
  try {
    const data = regionSchema.parse(req.body);
    const region = await prisma.region.create({ data });
    res.status(201).json(region);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/regions/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = regionSchema.partial().parse(req.body);
    const region = await prisma.region.update({ where: { id }, data });
    res.json(region);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/regions/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    await prisma.region.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get("/api/posts", async (req, res, next) => {
  try {
    const { category, region, q, status = "APPROVED" } = req.query;
    const posts = await prisma.post.findMany({
      where: {
        status,
        category: category ? { slug: String(category) } : undefined,
        region: region ? { name: String(region) } : undefined,
        title: q ? { contains: String(q) } : undefined
      },
      include: { category: true, region: true, images: true },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 80
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/posts", async (_req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { category: true, region: true, images: true },
      orderBy: [{ createdAt: "desc" }],
      take: 200
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

app.get("/api/posts/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const post = await prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: { category: true, region: true, images: true }
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

app.post("/api/posts", async (req, res, next) => {
  try {
    const data = postSchema.parse(req.body);
    const post = await prisma.post.create({
      data: {
        ...data,
        status: data.status || "PENDING",
        pinned: data.pinned || false,
        auditLogs: { create: { action: "CREATE", note: "提交信息" } }
      }
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/posts/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = postSchema.partial().parse(req.body);
    const post = await prisma.post.update({ where: { id }, data });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/posts/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    await prisma.post.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/posts/:id/status", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const schema = z.object({
      status: z.enum(["PENDING", "APPROVED", "REJECTED", "EXPIRED"]),
      note: z.string().optional()
    });
    const data = schema.parse(req.body);
    const post = await prisma.post.update({
      where: { id },
      data: {
        status: data.status,
        auditLogs: {
          create: {
            action: data.status === "APPROVED" ? "APPROVE" : data.status === "REJECTED" ? "REJECT" : "CREATE",
            note: data.note
          }
        }
      }
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/posts/:id/pin", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const schema = z.object({ pinned: z.boolean() });
    const data = schema.parse(req.body);
    const post = await prisma.post.update({
      where: { id },
      data: {
        pinned: data.pinned,
        auditLogs: { create: { action: data.pinned ? "PIN" : "UNPIN" } }
      }
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

app.get("/api/articles", async (req, res, next) => {
  try {
    const published = req.query.published === undefined ? undefined : req.query.published === "true";
    const articles = await prisma.article.findMany({
      where: published === undefined ? undefined : { published },
      orderBy: { createdAt: "desc" }
    });
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/articles", async (req, res, next) => {
  try {
    const data = articleSchema.parse(req.body);
    const article = await prisma.article.create({ data: { ...data, published: data.published || false } });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/articles/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = articleSchema.partial().parse(req.body);
    const article = await prisma.article.update({ where: { id }, data });
    res.json(article);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/articles/:id", async (req, res, next) => {
  try {
    const { id } = idParam.parse(req.params);
    await prisma.article.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const status = error.name === "ZodError" ? 400 : 500;
  res.status(status).json({
    error: status === 400 ? "请求参数不正确" : "服务器错误",
    detail: error.message
  });
});

app.listen(port, () => {
  console.log(`九江信息网 API running at http://127.0.0.1:${port}`);
});
