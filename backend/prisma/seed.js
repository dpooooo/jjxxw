import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  ["housing", "房产信息", "租房、售楼、门市、车库、厂房"],
  ["jobs", "人才招聘", "招聘、求职、兼职、家政岗位"],
  ["market", "二手供求", "二手物品、同城交易、闲置回收"],
  ["cars", "车辆信息", "二手车、租车、顺风车、维修"],
  ["business", "商铺出兑", "店铺转让、门市出租、生意合作"],
  ["services", "便民服务", "装修、搬家、维修、跑腿服务"],
  ["news", "公告资讯", "本地通知、天气、交通、政策资讯"]
];

const regions = ["浔阳区", "濂溪区", "柴桑区", "开发区", "八里湖新区", "瑞昌", "湖口", "修水", "都昌", "共青城"];

async function main() {
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "ADMIN"
    }
  });

  for (const [index, [slug, name, description]] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, description, sortOrder: index },
      create: { slug, name, description, sortOrder: index }
    });
  }

  for (const [index, name] of regions.entries()) {
    await prisma.region.upsert({
      where: { name },
      update: { sortOrder: index },
      create: { name, sortOrder: index }
    });
  }

  const housing = await prisma.category.findUnique({ where: { slug: "housing" } });
  const jobs = await prisma.category.findUnique({ where: { slug: "jobs" } });
  const xunyang = await prisma.region.findUnique({ where: { name: "浔阳区" } });
  const lianxi = await prisma.region.findUnique({ where: { name: "濂溪区" } });

  await prisma.post.createMany({
    data: [
      {
        title: "浔阳区湖滨小区两室一厅整租，拎包入住",
        summary: "交通便利，家具家电齐全，近学校和菜场，年租可议。",
        content: "湖滨小区两室一厅整租，楼层适中，采光好。家具家电齐全，适合一家人长期居住。",
        label: "出租",
        contactName: "李女士",
        phone: "138-0000-1024",
        status: "APPROVED",
        pinned: true,
        categoryId: housing.id,
        regionId: xunyang.id
      },
      {
        title: "九江万达餐饮店招聘服务员，包吃住",
        summary: "月薪 4200-5500，排班制，有经验优先。",
        content: "餐饮门店招聘长期服务员，要求踏实负责，沟通顺畅。提供工作餐和住宿，薪资按经验面议。",
        label: "急招",
        contactName: "周经理",
        phone: "139-0000-8821",
        status: "APPROVED",
        pinned: true,
        categoryId: jobs.id,
        regionId: lianxi.id
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
