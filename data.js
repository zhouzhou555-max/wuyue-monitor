/* ============================================================
   闽浙吾悦商圈监控平台 · 每日数据（由每日定时任务自动写入）
   window.DATA 以日期(YYYY-MM-DD)为键，每天为事件数组，保留最近7天。
   字段：
     id / type / subtype / brand / title / mall(吾悦广场id) / floor / category
     when(事件日期 YYYY-MM-DD，留空=当前进行中/近期)
     source / sourceUrl(可点击原文链接，无则留空) / confidence(ok|pending) / note
   type：open开店 / close闭店 / change调整 / activity活动 / comp竞品商场动态
   comp 事件：mall=对应吾悦广场id，brand=竞品商场名，subtype=open新店/close闭店/change调改/event活动。
   看板按 when 过滤：近14天内 / 未来 / 留空(进行中) 才显示，过期自动隐藏。
   ============================================================ */
window.UPDATED_AT = "2026-11-16 09:05";

window.DATA = {
  "2026-11-16": [
    /* ===== 吾悦·开店闭店（漳州 zz · 11月首店/新店扎堆） ===== */
    { id:48, type:"open", brand:"龍歌自助小火锅", title:"龍歌自助小火锅 漳州首店 11.14 开业", mall:"zz", floor:"L3", category:"火锅", when:"2026-11-14", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"ok", note:"铺位L3-3008，自助小火锅，非遗福州鱼丸/葡式蛋挞等新品" },
    { id:49, type:"open", brand:"如鮨寿司", title:"如鮨寿司 福建首店入驻", mall:"zz", floor:"L3", category:"日料", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L3001-1/3001-2/3002，具体开业日待核实" },
    { id:50, type:"open", brand:"CiCi Lee 西西里", title:"CiCi Lee 西西里·世界餐融合料理 福建首店", mall:"zz", floor:"L4", category:"融合料理", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L4070，具体开业日待核实" },
    { id:51, type:"open", brand:"Jidoplus 儿多里", title:"Jidoplus 儿多里 漳州首店入驻", mall:"zz", floor:"B1", category:"儿童亲子", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位B1021/1022，具体开业日待核实" },
    { id:52, type:"open", brand:"yescci", title:"yescci 漳州首店入驻", mall:"zz", floor:"L1", category:"零售", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L1036，具体开业日待核实" },
    { id:53, type:"open", brand:"a blueberry", title:"a blueberry 漳州首店入驻", mall:"zz", floor:"L1", category:"童装", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L1009，具体开业日待核实" },
    { id:54, type:"open", brand:"李若桃手作酸奶", title:"李若桃手作酸奶 漳州首店入驻", mall:"zz", floor:"B1", category:"酸奶茶饮", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位B1019，新中式手作酸奶，具体开业日待核实" },
    { id:55, type:"open", brand:"東方墨蘭", title:"東方墨蘭 新店入驻", mall:"zz", floor:"L1", category:"茶饮", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L1010，具体开业日待核实" },
    { id:56, type:"open", brand:"若可创意韩料", title:"若可创意韩料 新店入驻", mall:"zz", floor:"L3", category:"韩式料理", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"pending", note:"铺位L3057/3058，具体开业日待核实" },

    /* ===== 吾悦·大型活动（漳州 zz） ===== */
    { id:57, type:"activity", subtype:"event", brand:"秋假·冬日充能", title:"漳州吾悦秋假「冬日充能」系列活动（11.18-11.22）", mall:"zz", floor:"—", category:"主题活动", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MTgzOQ==&mid=2247499563&idx=1&sn=63647ca7013ae6b6954ae3f9b3634cbc&chksm=cfb065cd155994ca08b27d9bf6a0319e054ad47e3eca8a8bba590cf0881d23acf46361ae0591#rd", confidence:"ok", note:"秋趣游园会/宠流浪动物领养展/徒手剥柚子大赛等；潮音吾悦·归来乐队专场11.14" },

    /* ===== 吾悦·开店闭店（台州湾 tzw） ===== */
    { id:58, type:"open", brand:"花哚女装", title:"花哚女装 台州湾吾悦店 新店招聘中", mall:"tzw", floor:"L2", category:"女装", when:"", source:"BOSS直聘", sourceUrl:"https://www.zhipin.com/job_detail/158034465cfaeec10nBy2964EVRR.html", confidence:"pending", note:"全国600+连锁直营女装，招聘导购，具体开业日待核实" },

    /* ===== 吾悦·大型活动（晋江 jj） ===== */
    { id:59, type:"activity", subtype:"event", brand:"消防宣传月", title:"消防宣传月暨119消防日主题宣传活动", mall:"jj", floor:"—", category:"消防科普", when:"2026-11-05", source:"晋江新闻网", sourceUrl:"https://news.ijjnews.com/mobile/jjxw/jzdx/2026/11/06/510976.shtml", confidence:"ok", note:"陈埭镇在晋江吾悦开展，消防疏散演练/反恐防暴演示/装备观摩等" },

    /* ===== 竞品动态（义乌 · 对应 yw · 山姆筹备） ===== */
    { id:60, type:"comp", subtype:"open", brand:"山姆会员商店（义乌）", title:"山姆义乌店施工中，计划2027.4开业", mall:"yw", category:"竞品动态", when:"", source:"网易/21世纪经济报道", sourceUrl:"https://c.m.163.com/news/a/LBB8CF5I0534J5H4.html", confidence:"ok", note:"义乌山姆超市有限公司2026.3.25成立，项目近7万㎡/三层，装修进度约20%，计划2027.1竣工、4月开业；仓储会员制超市商圈级事件" },

    /* ===== 竞品动态（晋江 · 对应 jj） ===== */
    { id:61, type:"comp", subtype:"open", brand:"盒马鲜生（泉州前置仓）", title:"盒马泉州首批前置仓，晋江青阳仓预计11月中旬上线", mall:"jj", category:"竞品动态", when:"", source:"晋江新闻网", sourceUrl:"https://www.ijjnews.com/house/lszx/2026-11-13/511993.shtml", confidence:"pending", note:"洛江居然之家/晋江青阳新华街/石狮凤凰城三仓，纯线上履约，具体上线日待核实" },
    { id:62, type:"comp", subtype:"close", brand:"中闽百汇桥南商场", title:"中闽百汇桥南商场 11.22 停业", mall:"jj", category:"竞品动态", when:"2026-11-22", source:"晋江新闻网", sourceUrl:"https://www.ijjnews.com/house/lszx/2026-11-13/511993.shtml", confidence:"ok", note:"开业十余年老牌社区商超，11.22晚22时起停业，全场出清5折；传统商超收缩信号" },

    /* ===== 竞品动态（瑞安 · 对应 ra） ===== */
    { id:63, type:"comp", subtype:"open", brand:"超盒算NB（盒马）", title:"超盒算NB 瑞安第二家门店 11.20 开业", mall:"ra", category:"竞品动态", when:"2026-11-20", source:"瑞安在线论坛", sourceUrl:"https://bbs.ruian.com/thread-8865741-1-1.html", confidence:"pending", note:"盒马旗下硬折扣社区超市，落户新世纪大厦，分流商圈客流" },

    /* ===== 竞品动态（温州 · 对应 wz） ===== */
    { id:64, type:"comp", subtype:"event", brand:"滨江万象城", title:"首届温州米其林指南美食荟（11.13-11.15）", mall:"wz", category:"竞品动态", when:"2026-11-13", source:"温州新闻网", sourceUrl:"https://www.66wz.com/wendu/system/2026/11/14/105871988.shtml", confidence:"ok", note:"集结粤8号/珀/潮上潮/橙园等10家米其林餐厅，放大美食+商业+文旅叠加效应" },
    { id:65, type:"comp", subtype:"risk", brand:"世贸银泰盒马", title:"世贸银泰盒马试吃会引发腹泻投诉", mall:"wz", category:"竞品动态", when:"", source:"网易", sourceUrl:"https://www.163.com/dy/article/LB7N69D005149FUI.html", confidence:"pending", note:"试吃会后部分网友反馈腹泻，盒马客服已跟进，因果暂无定论" },

    /* ===== 竞品动态（衢州 · 对应 qz） ===== */
    { id:66, type:"comp", subtype:"event", brand:"衢州银泰城", title:"衢州银泰城两周年庆（11.20-11.22）", mall:"qz", category:"竞品动态", when:"2026-11-20", source:"衢江新闻网", sourceUrl:"https://www.qjcmjt.cn/qjxwwsy/msxw/202611/t20261110_7814915.shtml", confidence:"ok", note:"满11.21抽奖、百万团券、音乐节/明星见面会、十米蛋糕，激活衢江商圈" },

    /* ===== 竞品动态（台州湾 · 对应 tzw） ===== */
    { id:67, type:"comp", subtype:"open", brand:"爱婴室", title:"爱婴室 台州首店 11.7 启幕（椒江宝龙城）", mall:"tzw", category:"竞品动态", when:"2026-11-07", source:"新浪", sourceUrl:"https://www.sina.cn/news/detail/5363301083251039.html", confidence:"ok", note:"母婴连锁首进台州，落椒江宝龙城3楼；宝龙城破产重整背景下仍有首店落地" }
  ],

  "2026-11-14": [
    /* ===== 吾悦·开店闭店（台州黄岩 hy） ===== */
    { id:31, type:"open", brand:"潮品挚尚", title:"潮品挚尚 生活好物集合店 11.04 开业", mall:"hy", floor:"L1", category:"潮玩集合", when:"2026-11-04", source:"黄岩吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=MzUyODMzNDc4Nw==&mid=2247557323&idx=1&sn=7cafdd86a4c47240d110ad3c5cb448da&chksm=fb70b890703006ce7645b6880ded7812d34b6a04ba12245fcce60bc06b74d86e807f264f7156#rd", confidence:"ok", note:"生活百货/潮玩盲盒/谷子集合店，SKU万余种，11.04盛大开业" },
    { id:32, type:"open", brand:"盒马鲜生", title:"盒马鲜生 黄岩吾悦店（B1）筹备招聘中", mall:"hy", floor:"B1", category:"仓储/新零售", when:"", source:"BOSS直聘", sourceUrl:"https://www.zhipin.com/job_detail/f53f2aa93706293203N60tW6FVZY.html", confidence:"pending", note:"盒马进驻黄岩吾悦-1号门，招聘中，具体开业日待核实" },

    /* ===== 吾悦·开店闭店（台州玉环 yh） ===== */
    { id:33, type:"open", brand:"盒马鲜生", title:"盒马鲜生 玉环吾悦店 筹备招聘中", mall:"yh", floor:"—", category:"仓储/新零售", when:"", source:"BOSS直聘", sourceUrl:"https://www.zhipin.com/job_detail/cdbe17f33585377b0nd72NS5EVdQ.html", confidence:"pending", note:"盒马进驻玉环吾悦，招聘收银/理货等，具体开业日待核实" },

    /* ===== 吾悦·开店闭店（台州仙居 xj） ===== */
    { id:34, type:"open", brand:"花哚女装", title:"花哚女装 新店开业", mall:"xj", floor:"—", category:"女装", when:"", source:"BOSS直聘", sourceUrl:"https://www.zhipin.com/job_detail/bd2ca0663939168e0nVy2dm7E1BZ.html", confidence:"pending", note:"全国600+连锁直营女装，招聘店长导购，具体开业日待核实" },
    { id:35, type:"open", brand:"奇悦互动儿童娱乐", title:"奇悦互动儿童娱乐（游艺）设立公示", mall:"xj", floor:"L4", category:"游艺娱乐", when:"", source:"仙居县文广旅体局", sourceUrl:"https://www.zjxj.gov.cn/col/col1229322527/art/2026/art_dc4df27b62ea43e19eb6011685885821.html", confidence:"pending", note:"11.10受理设立游艺娱乐场所，吾悦4楼4006铺，开业日待核实" },

    /* ===== 吾悦·开店闭店（瑞安 ra） ===== */
    { id:36, type:"open", brand:"纷响时光娱乐", title:"纷响时光（歌舞娱乐）设立公示", mall:"ra", floor:"L3", category:"歌舞娱乐", when:"", source:"瑞安市文广旅体局", sourceUrl:"https://www.ruian.gov.cn/col/col1229734278/art/2026/art_c17d97756c17454180ff8de8b2fe2567.html", confidence:"pending", note:"11.04受理设立歌舞娱乐场所，吾悦1幢309-314，开业日待核实" },
    { id:37, type:"close", brand:"奈雪的茶", title:"奈雪的茶 瑞安吾悦店 撤场", mall:"ra", floor:"—", category:"茶饮", when:"", source:"网易新闻", sourceUrl:"https://c.m.163.com/news/a/LB22JTVP0534JIG6.html", confidence:"ok", note:"奈雪就此退出温州市场；瑞安吾悦店上周撤场，具体撤场日待核实" },

    /* ===== 吾悦·开店闭店（晋江 jj） ===== */
    { id:38, type:"open", brand:"菌梦肴·云南野生菌火锅", title:"菌梦肴·云南野生菌火锅 11.06 开业", mall:"jj", floor:"—", category:"火锅", when:"2026-11-06", source:"晋江吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=MzU1ODU0Nzc0Nw==&mid=2247513573&idx=1&sn=2fdf62a1335c98ef9e2c00f7e53aea0c&chksm=fd30903ca42feed1ac0ff0d17ae02851c93237e50773b9c5989a9d1fe20d8d6fe152f068fc39#rd", confidence:"ok", note:"云南山野菌菇火锅，100%原产地食用菌" },

    /* ===== 吾悦·大型活动 ===== */
    { id:39, type:"activity", subtype:"event", brand:"消防119嘉年华", title:"消防119嘉年华（消防宣传月）", mall:"tzw", floor:"—", category:"消防科普", when:"", source:"台州消防", sourceUrl:"https://dy.163.com/article/LBI4BNDF05149GOD.html", confidence:"ok", note:"消防知识大转盘、巨型飞行棋、战斗服穿戴体验等互动专区" },
    { id:40, type:"activity", subtype:"promo", brand:"悦会员", title:"悦会员 11月权益上新", mall:"zz", floor:"—", category:"会员促销", when:"", source:"漳州吾悦广场公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=MzYyMjA4NjgzNQ==&mid=2247484957&idx=2&sn=1f83158e4965d8ba4e346802959855f2&chksm=fe49309c4cd5180a1ac46f4c340d50f6e1899cd9fa9b273359f7f630bbc534af0f12259f8f68#rd", confidence:"ok", note:"3大上新权益+10大经典权益，苏门子弟/满香舒/云阿蛮等" },
    { id:41, type:"activity", subtype:"promo", brand:"全闽乐购·有奖发票", title:"有奖发票活动优化升级（全闽乐购）", mall:"pt", floor:"—", category:"政府促消费", when:"", source:"平潭时报", sourceUrl:"https://www.ptrmt.com/mobile/2026/20261111/20261111_001/content_20261111_001_4.htm", confidence:"ok", note:"最高奖金提至800元，叠加商圈促销/以旧换新/购车补贴" },

    /* ===== 竞品商场动态（温州 · 对应 wz） ===== */
    { id:42, type:"comp", subtype:"open", brand:"盒马鲜生", title:"盒马鲜生 温州世贸银泰店（市区第2家）11.27 开业", mall:"wz", category:"竞品动态", when:"2026-11-27", source:"网易新闻", sourceUrl:"https://c.m.163.com/news/a/LB22JTVP0534JIG6.html", confidence:"ok", note:"老城区补位大南门沃尔玛/快乐购闭店缺口；新零售地标分流" },
    { id:43, type:"comp", subtype:"risk", brand:"滨江万象城", title:"几多全（蓝标首店）货架安全隐患遭吐槽", mall:"wz", category:"竞品动态", when:"", source:"网易新闻", sourceUrl:"https://www.163.com/dy/article/LBK37IL50545AOQT.html", confidence:"ok", note:"货架金属尖角磕伤顾客，品牌回应跟进，整改未公开" },
    { id:44, type:"comp", subtype:"change", brand:"滨江万象城", title:"趁热集合迁出世贸银泰B馆1F", mall:"wz", category:"竞品动态", when:"", source:"网易新闻", sourceUrl:"https://c.m.163.com/news/a/LB22JTVP0534JIG6.html", confidence:"ok", note:"滨万B1烘焙品牌迁至世贸银泰，疑与B1租金上调有关" },

    /* ===== 竞品商场动态（衢州 · 对应 qz） ===== */
    { id:45, type:"comp", subtype:"open", brand:"衢州银泰城", title:"盒马鲜生 衢州银泰城店 招聘中", mall:"qz", category:"竞品动态", when:"", source:"BOSS直聘", sourceUrl:"https://www.zhipin.com/job_detail/a92c25ffb3ae591203xy3N65F1tV.html", confidence:"pending", note:"衢江银泰城3号门，新零售地标进驻竞品，开业日待核实" },
    { id:46, type:"comp", subtype:"open", brand:"鹿鸣岛银泰inPARK", title:"肯德基新店（装修中）招聘", mall:"qz", category:"竞品动态", when:"", source:"BOSS直聘", sourceUrl:"https://m.zhipin.com/job_detail/ded4cbfd5776dbc51Hx83Nu0F1NR.html", confidence:"pending", note:"KFC西区新店入驻inPARK，装修中招聘楼面经理" },

    /* ===== 竞品商场动态（漳州 · 对应 zz） ===== */
    { id:47, type:"comp", subtype:"open", brand:"漳州碧湖万达广场", title:"焰匠·板前烤肉饭 漳州首店（11月开业）", mall:"zz", category:"竞品动态", when:"", source:"新浪新闻", sourceUrl:"https://www.sina.cn/news/detail/5363744785565571.html", confidence:"pending", note:"碧湖万达3F，具体开业日待核实" }
  ],

  "2026-11-13": [
    /* ===== 吾悦·开店闭店（温州吾悦 11月新店，具体开业日待核实） ===== */
    { id:1, type:"open", brand:"言青山成都火锅", title:"言青山成都火锅 温州首店", mall:"wz", floor:"L4", category:"火锅", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"具体开业日待核实（公开报道仅'11月'）" },
    { id:2, type:"open", brand:"季言·甄选料理自助", title:"季言·甄选料理自助 温州首店", mall:"wz", floor:"L4", category:"自助餐饮", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"已确认开业，具体日期待核实" },
    { id:3, type:"open", brand:"创想三维", title:"创想三维 浙江首店（3D打印潮玩）", mall:"wz", floor:"L1", category:"科技潮玩", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"浙江首店，具体开业日待核实" },
    { id:4, type:"open", brand:"GW&GW超级折扣", title:"GW&GW超级折扣 温州首店", mall:"wz", floor:"L3", category:"儿童潮装", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"温州首店，具体开业日待核实" },
    { id:5, type:"open", brand:"去茶去·新温州菜", title:"去茶去·新温州菜 新店", mall:"wz", floor:"L5", category:"本土瓯菜", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"具体开业日待核实" },
    { id:6, type:"open", brand:"IN FOOD食在", title:"IN FOOD食在 新店", mall:"wz", floor:"L5", category:"轻食/披萨", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"具体开业日待核实；另有乐清正大广场店6.21开（温州首店）" },

    /* ===== 吾悦·开店闭店（台州湾吾悦 11月新店） ===== */
    { id:7, type:"open", brand:"原时肥鸡蛙蛙锅", title:"原时肥鸡蛙蛙锅 即将启幕", mall:"tzw", floor:"L3", category:"火锅", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"pending", note:"状态为'即将启幕'，未正式开业" },
    { id:8, type:"open", brand:"luckin coffee", title:"luckin coffee 新店", mall:"tzw", floor:"L1", category:"咖啡", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"ok", note:"咖啡业态补位" },
    { id:9, type:"open", brand:"毛记和意冒菜", title:"毛记和意冒菜 新店", mall:"tzw", floor:"B1", category:"快餐", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"ok", note:"下沉快餐品牌" },
    { id:10, type:"open", brand:"舟港海味", title:"舟港海味 新店", mall:"tzw", floor:"B1", category:"海鲜", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"ok", note:"海鲜零售/餐饮" },
    { id:11, type:"change", brand:"DQ / MANNER / T-WORLD", title:"DQ、MANNER、T-WORLD 焕新升级", mall:"tzw", floor:"L1", category:"轻餐/数码", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"ok", note:"品牌焕新而非撤铺，信号偏正面" },

    /* ===== 吾悦·大型活动 ===== */
    { id:12, type:"activity", subtype:"sport", brand:"吾悦少年派·竞赛大联盟", title:"吾悦少年派·竞赛大联盟（自研赛事IP）", mall:"wz", floor:"—", category:"少儿赛事", when:"", source:"界面新闻", sourceUrl:"https://www.jiemian.com/article/15295927.html", confidence:"ok", note:"体育进商场，常态化引流家庭客群" },
    { id:13, type:"activity", subtype:"promo", brand:"秋日趣玩月", title:"秋日趣玩月 满赠活动（即日起-11.25）", mall:"tzw", floor:"—", category:"促销", when:"", source:"台州湾吾悦公众号", sourceUrl:"", confidence:"ok", note:"服饰满399赠超市卡、餐饮满99赠奶茶券" },

    /* ===== 竞品商场动态（温州 · 对应 wz） ===== */
    { id:14, type:"comp", subtype:"change", brand:"印象城MEGA", title:"盒马鲜生温州第4店进驻B1，接棒Ole", mall:"wz", category:"竞品动态", when:"", source:"网易/今日头条", sourceUrl:"https://www.163.com/dy/article/L9E7M1KP0534JIG6.html", confidence:"ok", note:"围挡施工中，预计2026春节前开业" },
    { id:15, type:"comp", subtype:"open", brand:"滨江万象城", title:"几多全浙江蓝标首店开业", mall:"wz", category:"竞品动态", when:"2026-10-17", source:"温州市政府/温州日报", sourceUrl:"https://www.wenzhou.gov.cn/col/col1217831/art/2026/art_f0d2a97fa41b4e46b3d8dfdbcfeef2c9.html", confidence:"ok", note:"鲜食零售「零食界山姆」首店，B1约400㎡" },
    { id:16, type:"comp", subtype:"change", brand:"滨江万象城", title:"鲍师傅撤出、招下沉品牌引'降档'争议", mall:"wz", category:"竞品动态", when:"2026-08-12", source:"网易", sourceUrl:"https://www.163.com/dy/article/L454K6AH0535KUB5.html", confidence:"ok", note:"1楼16家新能源车店占门面，高端定位松动信号" },
    { id:17, type:"comp", subtype:"close", brand:"温州万象城", title:"星巴克金街老店闭店撤场", mall:"wz", category:"竞品动态", when:"2026-10-26", source:"今日头条", sourceUrl:"https://www.toutiao.com/article/7703064496939532850/", confidence:"ok", note:"原铺将迎IVEEN意未(浙江首店)" },
    { id:18, type:"comp", subtype:"open", brand:"温州万象城", title:"CASETiFY 温州首店开业", mall:"wz", category:"竞品动态", when:"2026-09-29", source:"时装L'OFFICIEL", sourceUrl:"http://lcmag.com.cn/index/broadcast/22026.html", confidence:"ok", note:"潮流消费首店仍首选万象城" },

    /* ===== 竞品商场动态（台州湾 · 对应 tzw） ===== */
    { id:19, type:"comp", subtype:"open", brand:"台州经开万达广场", title:"喵塘主麻辣烤鱼台州首店 12.12 开业", mall:"tzw", category:"竞品动态", when:"2026-12-12", source:"澎湃新闻", sourceUrl:"https://m.thepaper.cn/newsDetail_forward_32875901", confidence:"ok", note:"海底捞旗下烤鱼品牌，全国第4家" },
    { id:20, type:"comp", subtype:"event", brand:"台州经开万达广场", title:"十周年'酸酸市集'", mall:"tzw", category:"竞品动态", when:"2026-06-19", source:"台州本地宝", sourceUrl:"https://m.tz.bendibao.com/edu/32220.shtm", confidence:"ok", note:"40+品牌首进台州" },
    { id:29, type:"comp", subtype:"risk", brand:"台州宝龙城（宝龙水街）", title:"项目公司璟懿实业破产重整，11.3法院受理", mall:"tzw", category:"竞品动态", when:"2026-11-03", source:"浙江司法公开网", sourceUrl:"https://zjsfgkw.gov.cn/art/2026/11/5/art_677_55159.html", confidence:"ok", note:"全国第三座宝龙城、总投资约30亿；债权人12.6前申报、12.8一债会" },
    { id:30, type:"comp", subtype:"open", brand:"山姆会员商店（台州首店）", title:"山姆台州首店 11.12 正式开业", mall:"tzw", category:"竞品动态", when:"2026-11-12", source:"澎湃新闻/美通社", sourceUrl:"https://www.thepaper.cn/newsDetail_forward_34429244", confidence:"ok", note:"浙东南首店、全国第72家，仓储会员制超市分流商圈客流；椒江/黄岩/路桥/温岭云仓已先期开业" },

    /* ===== 竞品商场动态（漳州 · 对应 zz） ===== */
    { id:21, type:"comp", subtype:"open", brand:"漳州碧湖万达广场", title:"11-12月新店集结（银河之星福建首店等）", mall:"zz", category:"竞品动态", when:"", source:"漳州碧湖万达公众号", sourceUrl:"http://mp.weixin.qq.com/s?__biz=MjM5MjE4ODY4Mg==&mid=2656552729&idx=1&sn=4d1c81462c9f0ffc8aa07b1db929eb0c&chksm=bcddaccaa17bf3ea5c20e97273698fdb45acac0e82ab3f3fb7940ef75d625c238e371ce433f5#rd", confidence:"ok", note:"菌东来/野木槿/焰匠/李若桃等多家漳州首店" },
    { id:22, type:"comp", subtype:"open", brand:"漳州碧湖万达广场", title:"上半年引入8家品质首店", mall:"zz", category:"竞品动态", when:"2026-06-30", source:"今日头条", sourceUrl:"https://m.toutiao.com/article/7683898538471719424", confidence:"ok", note:"好利来/无添寿司/Thai澜山枫等" },

    /* ===== 竞品商场动态（晋江 · 对应 jj） ===== */
    { id:23, type:"comp", subtype:"open", brand:"泉州晋江万达广场", title:"11-12月新店（几多全泉州首店/联想/三星/腾势）", mall:"jj", category:"竞品动态", when:"", source:"新浪新闻", sourceUrl:"https://www.sina.cn/news/detail/5354226294985922.html", confidence:"ok", note:"几多全泉州首店落2F，预计11月开业" },
    { id:24, type:"comp", subtype:"open", brand:"泉州晋江万达广场", title:"年内17家城市首店，国庆客流+8%", mall:"jj", category:"竞品动态", when:"2026-10-07", source:"晋江市政府", sourceUrl:"https://www.jinjiang.gov.cn/xxgk/jjyw/202610/t20261007_3333428.htm", confidence:"ok", note:"滨寿司/法大吉烘焙等首店" },

    /* ===== 竞品商场动态（义乌 · 对应 yw） ===== */
    { id:25, type:"comp", subtype:"change", brand:"义乌之心", title:"NIKE RISE 全新形象店启幕", mall:"yw", category:"竞品动态", when:"2026-05-31", source:"义乌之心公众号", sourceUrl:"", confidence:"ok", note:"运动旗舰升级，1-2楼形象店" },
    { id:26, type:"comp", subtype:"open", brand:"义乌之心", title:"老庙古韵 浙江旗舰店开业", mall:"yw", category:"竞品动态", when:"2026-06-19", source:"义乌之心公众号", sourceUrl:"", confidence:"ok", note:"首个老庙古韵浙江旗舰店，L2" },

    /* ===== 竞品商场动态（衢州 · 对应 qz） ===== */
    { id:27, type:"comp", subtype:"open", brand:"鹿鸣岛银泰inPARK", title:"肯德基等新店落地，公园式商业", mall:"qz", category:"竞品动态", when:"", source:"新浪财经", sourceUrl:"https://finance.sina.com.cn/jjxw/2026-06-03/doc-inhzzyth4577455.shtml", confidence:"ok", note:"首店+草坪音乐会差异化" },
    { id:28, type:"comp", subtype:"event", brand:"鹿鸣岛银泰inPARK", title:"暑期'清凉节'活动", mall:"qz", category:"竞品动态", when:"2026-07-15", source:"衢州传媒网", sourceUrl:"https://www.qz123.com/xinwen/202608/t20260807_7607539.shtml", confidence:"ok", note:"玩水项目拉动日间消费" }
  ]
};
