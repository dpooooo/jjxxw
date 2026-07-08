export const categories = [
  { slug: "housing", name: "房产信息", short: "房产", tone: "emerald", description: "整租、合租、门市、商铺、厂房等本地房产信息。" },
  { slug: "jobs", name: "人才招聘", short: "招聘", tone: "rose", description: "全职、兼职、求职、店员、服务员等招聘求职信息。" },
  { slug: "market", name: "二手供求", short: "二手", tone: "amber", description: "二手转让、闲置出售、回收置换、同城交易信息。" },
  { slug: "cars", name: "车辆信息", short: "车辆", tone: "sky", description: "二手车、拼车、顺风车、租车及车辆服务信息。" },
  { slug: "business", name: "商铺出兑", short: "出兑", tone: "violet", description: "门市转让、店铺出兑、商铺出租与经营合作信息。" },
  { slug: "services", name: "便民服务", short: "服务", tone: "slate", description: "搬家、维修、装修、保洁、家政等生活服务信息。" },
  { slug: "news", name: "公告资讯", short: "公告", tone: "blue", description: "本地通知、交通提醒、招聘会、天气与公共资讯。" }
];

export const regions = ["浔阳区", "濂溪区", "柴桑区", "开发区", "八里湖新区", "瑞昌", "湖口", "修水", "都昌", "共青城"];

export const posts = [
  {
    id: 10001,
    category: "housing",
    title: "浔阳区湖滨小区两室一厅整租，拎包入住",
    region: "浔阳区",
    status: "出租",
    expiresIn: 28,
    date: "今天",
    pinned: true,
    views: 126,
    contact: "李女士",
    phone: "138-0000-1024",
    summary: "家具家电齐全，临近学校和菜场，通勤方便。",
    content: "湖滨小区两室一厅整租，采光通风都不错，家具家电齐全，可直接入住。周边有菜场、公交站和学校，适合长期居住。"
  },
  {
    id: 10002,
    category: "housing",
    title: "八里湖新区精装公寓出租，近市民服务中心",
    region: "八里湖新区",
    status: "出租",
    expiresIn: 22,
    date: "今天",
    pinned: false,
    views: 72,
    contact: "赵女士",
    phone: "138-0000-2031",
    summary: "一室一厅，电梯房，适合上班族短租或长租。",
    content: "房子位于八里湖新区核心地段，装修较新，带空调、热水器和洗衣机。小区环境安静，距离市民服务中心和公交站步行可达。"
  },
  {
    id: 10003,
    category: "housing",
    title: "柴桑区三室两厅出售，南北通透带车位",
    region: "柴桑区",
    status: "出售",
    expiresIn: 35,
    date: "昨天",
    pinned: false,
    views: 94,
    contact: "许先生",
    phone: "136-0000-5512",
    summary: "楼层合适，采光好，小区停车方便，可随时看房。",
    content: "房源位于成熟小区，户型方正，南北通透，带独立车位。业主诚意出售，支持预约看房。"
  },
  {
    id: 10004,
    category: "jobs",
    title: "万达餐饮店招聘服务员，包吃住",
    region: "濂溪区",
    status: "急招",
    expiresIn: 15,
    date: "今天",
    pinned: true,
    views: 88,
    contact: "周经理",
    phone: "139-0000-8821",
    summary: "月薪 4200-5500，排班制，有相关经验优先。",
    content: "餐饮门店招聘长期服务员，要求做事认真，沟通顺畅，服从排班安排。提供工作餐和住宿，薪资面议。"
  },
  {
    id: 10005,
    category: "jobs",
    title: "连锁便利店招聘夜班店员，月休四天",
    region: "浔阳区",
    status: "招聘",
    expiresIn: 18,
    date: "今天",
    pinned: false,
    views: 69,
    contact: "人事部",
    phone: "135-0000-1208",
    summary: "工作稳定，要求责任心强，有零售经验优先。",
    content: "招聘夜班店员，负责收银、补货和店面整理。工作时间稳定，提供岗前培训，有便利店经验者优先。"
  },
  {
    id: 10006,
    category: "jobs",
    title: "家政公司招聘育婴师和保洁员，可培训",
    region: "开发区",
    status: "招聘",
    expiresIn: 30,
    date: "昨天",
    pinned: false,
    views: 108,
    contact: "孙老师",
    phone: "139-0000-7791",
    summary: "长期岗位，订单稳定，工资按单结算。",
    content: "家政公司招聘育婴师和保洁人员，工作地点灵活，可安排上岗培训。订单来源稳定，适合长期做服务行业。"
  },
  {
    id: 10007,
    category: "market",
    title: "个人转让九成新办公桌椅和文件柜",
    region: "开发区",
    status: "出售",
    expiresIn: 12,
    date: "今天",
    pinned: false,
    views: 42,
    contact: "陈先生",
    phone: "136-0000-3309",
    summary: "公司搬迁处理，数量不多，自提优先。",
    content: "现有办公桌、文件柜和椅子一批，成色较新，适合创业公司或门店补充办公设备。支持现场看货。"
  },
  {
    id: 10008,
    category: "market",
    title: "闲置儿童推车和安全座椅打包转让",
    region: "濂溪区",
    status: "出售",
    expiresIn: 16,
    date: "昨天",
    pinned: false,
    views: 42,
    contact: "罗女士",
    phone: "138-0000-6532",
    summary: "自用闲置，成色较新，打包可优惠。",
    content: "儿童推车和安全座椅均为家庭自用，功能正常，适合有宝宝的家庭。支持本地自提。"
  },
  {
    id: 10009,
    category: "market",
    title: "上门回收旧家电、空调、电脑和办公设备",
    region: "浔阳区",
    status: "回收",
    expiresIn: 60,
    date: "昨天",
    pinned: false,
    views: 117,
    contact: "老邱",
    phone: "137-0000-3410",
    summary: "市区可上门，价格公道，不缺斤少两。",
    content: "长期回收旧空调、洗衣机、电脑、办公家具等各类闲置物品，支持市区上门评估和回收。"
  },
  {
    id: 10010,
    category: "cars",
    title: "个人出售 2018 年家用轿车，手续齐全",
    region: "柴桑区",
    status: "个人车",
    expiresIn: 20,
    date: "今天",
    pinned: false,
    views: 67,
    contact: "王先生",
    phone: "137-0000-6618",
    summary: "车况良好，保险齐全，支持看车试驾。",
    content: "个人一手家用车，保养及时，无重大事故，手续齐全。支持预约看车和试驾。"
  },
  {
    id: 10011,
    category: "cars",
    title: "九江到南昌顺风车，工作日早晚可拼车",
    region: "浔阳区",
    status: "顺风车",
    expiresIn: 7,
    date: "今天",
    pinned: false,
    views: 75,
    contact: "小程",
    phone: "138-0000-2207",
    summary: "固定线路，提前预约，车内整洁。",
    content: "工作日往返九江和南昌，路线固定，可接受提前预约拼车。时间稳定，适合通勤或短期出行。"
  },
  {
    id: 10012,
    category: "cars",
    title: "七座商务车出售，适合家用和接送",
    region: "瑞昌",
    status: "出售",
    expiresIn: 25,
    date: "07-03",
    pinned: false,
    views: 84,
    contact: "彭先生",
    phone: "136-0000-9433",
    summary: "空间大，保养及时，保险到年底。",
    content: "车辆空间宽敞，适合家庭自驾和商务接送。车况稳定，保险和年检正常，可约看车。"
  },
  {
    id: 10013,
    category: "business",
    title: "成熟社区水果店整体转让，客源稳定",
    region: "八里湖新区",
    status: "转让",
    expiresIn: 18,
    date: "今天",
    pinned: true,
    views: 103,
    contact: "刘女士",
    phone: "135-0000-9088",
    summary: "设备齐全，接手即可经营，房租压力小。",
    content: "社区门口水果店整体转让，经营多年，固定客源稳定。冷柜、货架、收银设备齐全，可带货转。"
  },
  {
    id: 10014,
    category: "business",
    title: "浔阳区早餐店转让，设备全客源稳",
    region: "浔阳区",
    status: "转让",
    expiresIn: 22,
    date: "昨天",
    pinned: false,
    views: 139,
    contact: "马女士",
    phone: "138-0000-9088",
    summary: "居民区门口，接手即可营业，房东好沟通。",
    content: "早餐店位于居民区门口，早高峰客流稳定。店内蒸包炉、操作台等设备齐全，适合夫妻店经营。"
  },
  {
    id: 10015,
    category: "business",
    title: "开发区临街小门市出租，适合零售办公",
    region: "开发区",
    status: "门市",
    expiresIn: 33,
    date: "昨天",
    pinned: false,
    views: 76,
    contact: "宋先生",
    phone: "136-0000-3390",
    summary: "面积适中，租金压力小，门口可停车。",
    content: "门市位于临街位置，人流稳定，适合开便利店、工作室或小型办公室。支持现场看房。"
  },
  {
    id: 10016,
    category: "services",
    title: "本地搬家拉货，居民搬家可提前预约",
    region: "浔阳区",
    status: "服务",
    expiresIn: 30,
    date: "今天",
    pinned: false,
    views: 59,
    contact: "小胡",
    phone: "133-0000-7780",
    summary: "小件快搬、居民搬家、店铺拉货，价格透明。",
    content: "提供市区搬家拉货服务，支持居民搬家、店铺转场和小件运输。师傅熟悉本地路线，预约灵活。"
  },
  {
    id: 10017,
    category: "services",
    title: "专业水电维修、灯具安装、卫浴检修",
    region: "浔阳区",
    status: "维修",
    expiresIn: 45,
    date: "昨天",
    pinned: false,
    views: 115,
    contact: "刘师傅",
    phone: "138-0000-7712",
    summary: "多年经验，小活也接，明码报价。",
    content: "承接家庭水电维修、灯具更换、卫浴检修等服务。上门及时，价格透明，可先沟通后上门。"
  },
  {
    id: 10018,
    category: "services",
    title: "旧房翻新、墙面修补、局部改造施工",
    region: "濂溪区",
    status: "装修",
    expiresIn: 28,
    date: "昨天",
    pinned: false,
    views: 92,
    contact: "郭工",
    phone: "136-0000-5791",
    summary: "可上门量房，适合出租房和自住房翻新。",
    content: "提供旧房翻新、墙面修补、厨房卫生间局部改造等服务，可实地量房并提供施工建议。"
  },
  {
    id: 10019,
    category: "news",
    title: "九江未来 72 小时天气与出行提醒",
    region: "九江",
    status: "公告",
    expiresIn: 3,
    date: "今天",
    pinned: false,
    views: 214,
    contact: "九江信息网",
    phone: "0792-0000000",
    summary: "近期降雨增多，外出请注意道路积水和交通变化。",
    content: "未来三天九江部分区域有阵雨或雷雨，局地短时雨强较大。请提前规划出行路线，注意交通安全。"
  },
  {
    id: 10020,
    category: "news",
    title: "关于部分公交线路临时调整的通知",
    region: "九江",
    status: "公告",
    expiresIn: 5,
    date: "07-03",
    pinned: false,
    views: 156,
    contact: "九江信息网",
    phone: "0792-0000000",
    summary: "受道路施工影响，部分公交线路临时绕行。",
    content: "因道路施工，部分公交线路临时调整运行路线和停靠站点，请市民留意站牌公告并合理安排时间。"
  },
  {
    id: 10021,
    category: "news",
    title: "九江暑期招聘会本周末举行",
    region: "九江",
    status: "资讯",
    expiresIn: 7,
    date: "07-03",
    pinned: false,
    views: 143,
    contact: "九江信息网",
    phone: "0792-0000000",
    summary: "多家本地企业参加，求职者可现场咨询和投递。",
    content: "本周末将举办暑期招聘会，涉及餐饮、零售、制造、服务等多个行业，欢迎求职者前往现场了解岗位。"
  }
];

export const notices = [
  "九江信息网试运行：可免费发布本地生活信息。",
  "发布房产、招聘、二手、车辆信息前，请确认联系方式真实有效。",
  "平台仅提供信息展示，线下交易请注意核验身份并防范诈骗。"
];

export function getHotRegions(items = posts) {
  const counts = new Map();

  items.forEach((item) => {
    counts.set(item.region, (counts.get(item.region) || 0) + 1);
  });

  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, "zh-CN");
  });
}

export function getCategory(slug) {
  return categories.find((item) => item.slug === slug);
}

export function getPostsByCategory(slug) {
  return posts.filter((item) => item.category === slug);
}

export function getPost(id) {
  return posts.find((item) => String(item.id) === String(id));
}
