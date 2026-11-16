/* ============================================================
   闽浙吾悦商圈监控平台 · 广场名单 + 竞品商场映射（稳定配置）
   本文件为 12 家吾悦广场的准确名单，以及每家周边主要竞品商场。
   id 用于数据文件中的 mall 字段，请勿随意改动（改动需同步 data.js）。
   ============================================================ */
window.MALLS = [
  { id: "wz",  name: "温州吾悦广场",      city: "温州", prov: "浙江" },
  { id: "hy",  name: "台州黄岩吾悦广场",  city: "台州", prov: "浙江" },
  { id: "lq",  name: "台州路桥吾悦广场",  city: "台州", prov: "浙江" },
  { id: "xj",  name: "台州仙居吾悦广场",  city: "台州", prov: "浙江" },
  { id: "tzw", name: "台州湾吾悦广场",    city: "台州", prov: "浙江" },
  { id: "yh",  name: "台州玉环吾悦广场",  city: "台州", prov: "浙江" },
  { id: "qz",  name: "衢州吾悦广场",      city: "衢州", prov: "浙江" },
  { id: "ra",  name: "瑞安吾悦广场",      city: "温州", prov: "浙江" },
  { id: "yw",  name: "义乌吾悦广场",      city: "金华", prov: "浙江" },
  { id: "zz",  name: "漳州吾悦广场",      city: "漳州", prov: "福建" },
  { id: "jj",  name: "晋江吾悦广场",      city: "泉州", prov: "福建" },
  { id: "pt",  name: "平潭吾悦广场",      city: "福州", prov: "福建" }
];

/* ============================================================
   竞品商场映射：key = 吾悦广场 id，value = 该广场周边主要竞品购物中心。
   字段：name(名称) / brand(运营方) / opened(开业时间) / area(区位) /
         note(说明) / source(信源) / sourceUrl(可点击原文链接，无则留空)
   ============================================================ */
window.COMPETITORS = {
  wz: [
    { name: "印象城MEGA",   brand: "印力·万科",       opened: "2021-11-26", area: "鹿城区府东路333号", note: "温州大体量中高端家庭购物中心，与吾悦正面争夺家庭客群", source: "买购网", sourceUrl: "https://www.maigoo.com/top/430854.html" },
    { name: "滨江万象城",   brand: "华润万象生活",    opened: "2023-12-03", area: "鹿城区瓯江路3999号", note: "约14万㎡、超70%首进品牌，定位时尚高地+品质餐饮地标", source: "华润万象生活", sourceUrl: "https://www.crmixclifestyle.com.cn/gsxw/2023-12-04/1974440.html" },
    { name: "温州万象城",   brand: "华润万象生活",    opened: "2016-04-30", area: "瓯海区温瑞大道999号", note: "温州高端商业标杆，轻奢/重奢聚集", source: "买购网", sourceUrl: "https://www.maigoo.com/top/430854.html" }
  ],
  hy: [
    { name: "泰业广场",     brand: "—（非连锁）",     opened: "2022-12-28", area: "黄岩区", note: "黄岩唯一直接竞品；原台州天佑城", source: "公众号/百科", sourceUrl: "" }
  ],
  lq: [
    { name: "中盛城市广场", brand: "—",              opened: "—",          area: "路桥区", note: "路桥本地老牌商业体", source: "腾讯地图周边", sourceUrl: "" },
    { name: "台州南官新天地", brand: "—",            opened: "—",          area: "路桥区", note: "路桥新兴商业街区", source: "腾讯地图周边", sourceUrl: "" },
    { name: "富仕广场",     brand: "—",              opened: "—",          area: "路桥区", note: "路桥社区型商业", source: "腾讯地图周边", sourceUrl: "" },
    { name: "银泰城（椒江）", brand: "银泰",          opened: "—",          area: "椒江·约4km", note: "跨区竞品，距离较远、辐射有限", source: "腾讯地图周边", sourceUrl: "" }
  ],
  xj: [
    { name: "中百百货",     brand: "—",              opened: "—",          area: "仙居县", note: "本地小型百货，无连锁大型竞品", source: "腾讯地图周边", sourceUrl: "" },
    { name: "新百购物中心", brand: "—",              opened: "—",          area: "仙居县", note: "本地小型购物中心", source: "腾讯地图周边", sourceUrl: "" }
  ],
  tzw: [
    { name: "台州经开万达广场", brand: "万达",        opened: "—",          area: "椒江·约4km", note: "台州湾吾悦开业后分流最直接的竞品（万达热度本已下滑）", source: "台州19楼", sourceUrl: "https://taizhou.19lou.com/forum-827-thread-72591782483868980-1-1.html" },
    { name: "青悦城",       brand: "—",              opened: "—",          area: "椒江区", note: "背靠市民广场，城市级休闲地标、客群粘性高，抗冲击较强", source: "台州19楼", sourceUrl: "https://taizhou.19lou.com/forum-827-thread-72591782483868980-1-1.html" },
    { name: "台州宝龙城（宝龙水街）", brand: "宝龙", opened: "2022-06-24",  area: "椒江·城西", note: "全国第三座宝龙城；项目公司璟懿实业2026.11破产重整", source: "浙江司法公开网", sourceUrl: "https://zjsfgkw.gov.cn/art/2026/11/5/art_677_55159.html" },
    { name: "山姆会员商店", brand: "沃尔玛", opened: "2026-11-12", area: "椒江·商贸核心区", note: "台州首店/浙东南首店，仓储会员制超市，分流商圈客流", source: "澎湃新闻", sourceUrl: "https://www.thepaper.cn/newsDetail_forward_34429244" }
  ],
  yh: [
    { name: "玉城里·华鸿广场", brand: "—",           opened: "—",          area: "玉环·约1km", note: "距离最近的本地商业体", source: "腾讯地图周边", sourceUrl: "" },
    { name: "垟青大厦购物中心", brand: "—",          opened: "—",          area: "玉环市", note: "本地社区型购物中心", source: "腾讯地图周边", sourceUrl: "" }
  ],
  qz: [
    { name: "衢州柯城万达广场", brand: "万达",        opened: "—",          area: "柯城·约6km", note: "城市级标杆，衢州市商务局点名引入首店/沉浸式业态", source: "衢州市商务局", sourceUrl: "https://www.qz.gov.cn/col/col1229416669/art/2025/art_298bddf6f9454092a6f3e080d1273a52.html" },
    { name: "鹿鸣岛银泰inPARK", brand: "银泰",        opened: "2024-09",   area: "柯城·约2km", note: "2024国庆起营业，距离吾悦最近的新晋竞品", source: "衢州市商务局", sourceUrl: "https://www.qz.gov.cn/col/col1229416669/art/2025/art_298bddf6f9454092a6f3e080d1273a52.html" },
    { name: "衢江银泰城",   brand: "银泰",           opened: "—",          area: "衢江·约9km", note: "衢州城市级综合体之一", source: "衢州市商务局", sourceUrl: "https://www.qz.gov.cn/col/col1229416669/art/2025/art_298bddf6f9454092a6f3e080d1273a52.html" },
    { name: "奥特莱斯/时代广场", brand: "—",         opened: "—",          area: "柯城区", note: "衢州主城区另有多家综合体（13家）分流", source: "衢州市商务局", sourceUrl: "https://www.qz.gov.cn/col/col1229416669/art/2025/art_298bddf6f9454092a6f3e080d1273a52.html" }
  ],
  ra: [
    { name: "新湖银泰城",   brand: "银泰",           opened: "—",          area: "瑞安市", note: "瑞安唯一稳定的连锁大型竞品", source: "腾讯地图周边", sourceUrl: "" },
    { name: "瑞安万达广场", brand: "万达",           opened: "—（停滞）",   area: "瑞安市", note: "项目停滞多年，未形成有效竞争", source: "公开报道", sourceUrl: "" }
  ],
  yw: [
    { name: "义乌之心",     brand: "—",              opened: "—",          area: "义乌市", note: "义乌核心商圈标杆", source: "腾讯地图周边", sourceUrl: "" },
    { name: "银泰百货（义乌）", brand: "银泰",        opened: "—",          area: "义乌市", note: "传统百货竞品", source: "腾讯地图周边", sourceUrl: "" },
    { name: "义乌万达广场", brand: "万达",           opened: "—",          area: "义乌市", note: "全业态连锁竞品", source: "腾讯地图周边", sourceUrl: "" },
    { name: "绣湖商圈",     brand: "—",              opened: "—",          area: "义乌市", note: "绣湖公园周边成熟商业集群", source: "腾讯地图周边", sourceUrl: "" }
  ],
  zz: [
    { name: "漳州碧湖万达广场", brand: "万达",        opened: "2012",       area: "龙文·约2km", note: "漳州商业标杆（86万㎡），漳州首个市级示范核心商圈", source: "买购网", sourceUrl: "https://m.maigoo.com/top/431202.html" },
    { name: "漳州龙文宝龙广场", brand: "宝龙",        opened: "2020-12",    area: "龙文·约4km", note: "MALL+外街模式，夜经济", source: "买购网", sourceUrl: "https://m.maigoo.com/top/431202.html" },
    { name: "芗城万达广场", brand: "万达",           opened: "2023",       area: "芗城·约7km", note: "芗城精致生活中心", source: "买购网", sourceUrl: "https://m.maigoo.com/top/431202.html" },
    { name: "天虹商场",     brand: "天虹",           opened: "—",          area: "芗城·约2km", note: "老牌社区百货", source: "腾讯地图周边", sourceUrl: "" }
  ],
  jj: [
    { name: "泉州晋江万达广场", brand: "万达",        opened: "—",          area: "晋江·约3km", note: "晋江核心全业态竞品", source: "买购网", sourceUrl: "https://www.maigoo.com/top/430842.html" },
    { name: "晋江SM国际广场", brand: "SM",            opened: "2005",       area: "晋江市", note: "17.5万㎡，晋江最早大型购物广场", source: "买购网", sourceUrl: "https://www.maigoo.com/top/430842.html" },
    { name: "宝龙城市广场（晋江）", brand: "宝龙",    opened: "—",          area: "晋江市", note: "艺术+商业差异化", source: "晋江经济报", sourceUrl: "https://jjjjb.fjdaily.com/pc/con/202104/02/content_64114.html" },
    { name: "中骏世界城（泉州）", brand: "中骏",      opened: "—",          area: "泉州市", note: "跨区大型综合体", source: "买购网", sourceUrl: "https://www.maigoo.com/top/430842.html" }
  ],
  pt: [
    { name: "海坛商业城",   brand: "—",              opened: "—",          area: "平潭·约2km", note: "本地商业城", source: "腾讯地图周边", sourceUrl: "" },
    { name: "兴福兴购物广场", brand: "—",            opened: "—",          area: "平潭县", note: "本地购物广场；平潭无连锁大型竞品（吾悦为2026筹开项目）", source: "联商网", sourceUrl: "https://m.linkshop.com/article/column/533295" }
  ]
};
