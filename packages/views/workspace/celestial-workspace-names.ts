import type { SupportedLocale } from "@multica/core/i18n";

export interface CelestialWorkspaceName {
  slugBase: string;
  names: Record<SupportedLocale, string>;
}

function makeEntry(
  slugBase: string,
  en: string,
  zhHans: string,
  zhHant: string = zhHans,
): CelestialWorkspaceName {
  return {
    slugBase,
    names: {
      en,
      "zh-Hans": zhHans,
      "zh-Hant": zhHant,
      ja: zhHant,
      ko: en,
      ru: en,
      fr: en,
      es: en,
    },
  };
}

/**
 * 100-word Chinese Ancient Mythology random name lexicon for workspace & project
 * creation (四象瑞兽 / 星宿神明 / 仙山洞天 / 上古神器 / 清虚云霄).
 * Exported under `CELESTIAL_WORKSPACE_NAMES` as well for backwards compatibility.
 */
export const MYTHOLOGY_WORKSPACE_NAMES: readonly CelestialWorkspaceName[] = [
  // 一、四象与上古瑞兽（20）
  makeEntry("baize", "Baize", "白泽", "白澤"),
  makeEntry("xuanwu", "Xuanwu", "玄武", "玄武"),
  makeEntry("qinglong", "Qinglong", "青龙", "青龍"),
  makeEntry("zhuque", "Zhuque", "朱雀", "朱雀"),
  makeEntry("baihu", "Baihu", "白虎", "白虎"),
  makeEntry("qilin", "Qilin", "麒麟", "麒麟"),
  makeEntry("kunpeng", "Kunpeng", "鲲鹏", "鯤鵬"),
  makeEntry("yinglong", "Yinglong", "应龙", "應龍"),
  makeEntry("fenghuang", "Fenghuang", "凤凰", "鳳凰"),
  makeEntry("qingluan", "Qingluan", "青鸾", "青鸞"),
  makeEntry("chongming", "Chongming", "重明", "重明"),
  makeEntry("jiuwei", "Jiuwei", "九尾", "九尾"),
  makeEntry("bailu", "Bailu", "白鹿", "白鹿"),
  makeEntry("xuanhe", "Xuanhe", "玄鹤", "玄鶴"),
  makeEntry("jinwu", "Jinwu", "金乌", "金烏"),
  makeEntry("yutu", "Yutu", "玉兔", "玉兔"),
  makeEntry("zhulong", "Zhulong", "烛龙", "燭龍"),
  makeEntry("xiezhi", "Xiezhi", "獬豸", "獬豸"),
  makeEntry("gouchen", "Gouchen", "勾陈", "勾陳"),
  makeEntry("tengshe", "Tengshe", "螣蛇", "螣蛇"),

  // 二、星宿与天象神明（20）
  makeEntry("ziwei", "Ziwei", "紫微", "紫微"),
  makeEntry("xihe", "Xihe", "羲和", "羲和"),
  makeEntry("wangshu", "Wangshu", "望舒", "望舒"),
  makeEntry("taiyi", "Taiyi", "太一", "太一"),
  makeEntry("beidou", "Beidou", "北斗", "北斗"),
  makeEntry("tianshu", "Tianshu", "天枢", "天樞"),
  makeEntry("tianxuan", "Tianxuan", "天璇", "天璇"),
  makeEntry("tianji", "Tianji", "天玑", "天璣"),
  makeEntry("yuheng", "Yuheng", "玉衡", "玉衡"),
  makeEntry("kaiyang", "Kaiyang", "开阳", "開陽"),
  makeEntry("yaoguang", "Yaoguang", "瑶光", "瑤光"),
  makeEntry("fuxi", "Fuxi", "伏羲", "伏羲"),
  makeEntry("nuwa", "Nuwa", "女娲", "女媧"),
  makeEntry("goumang", "Goumang", "句芒", "句芒"),
  makeEntry("zhurong", "Zhurong", "祝融", "祝融"),
  makeEntry("xuanming", "Xuanming", "玄冥", "玄冥"),
  makeEntry("rushou", "Rushou", "蓐收", "蓐收"),
  makeEntry("houtu", "Houtu", "后土", "后土"),
  makeEntry("shaohao", "Shaohao", "少昊", "少昊"),
  makeEntry("zhuanxu", "Zhuanxu", "颛顼", "顓頊"),

  // 三、仙山洞天与神域（20）
  makeEntry("kunlun", "Kunlun", "昆仑", "崑崙"),
  makeEntry("penglai", "Penglai", "蓬莱", "蓬萊"),
  makeEntry("yingzhou", "Yingzhou", "瀛洲", "瀛洲"),
  makeEntry("fangzhang", "Fangzhang", "方丈", "方丈"),
  makeEntry("fusang", "Fusang", "扶桑", "扶桑"),
  makeEntry("jianmu", "Jianmu", "建木", "建木"),
  makeEntry("ruomu", "Ruomu", "若木", "若木"),
  makeEntry("yaochi", "Yaochi", "瑶池", "瑤池"),
  makeEntry("guixu", "Guixu", "归墟", "歸墟"),
  makeEntry("qingqiu", "Qingqiu", "青丘", "青丘"),
  makeEntry("buzhou", "Buzhou", "不周", "不周"),
  makeEntry("lingxiao", "Lingxiao", "凌霄", "凌霄"),
  makeEntry("xuanpu", "Xuanpu", "玄圃", "玄圃"),
  makeEntry("danxue", "Danxue", "丹穴", "丹穴"),
  makeEntry("nanming", "Nanming", "南溟", "南溟"),
  makeEntry("beiming", "Beiming", "北冥", "北冥"),
  makeEntry("cangming", "Cangming", "沧溟", "滄溟"),
  makeEntry("taixu", "Taixu", "太虚", "太虛"),
  makeEntry("yujing", "Yujing", "玉京", "玉京"),
  makeEntry("guanghan", "Guanghan", "广寒", "廣寒"),

  // 四、上古神器与雅器（20）
  makeEntry("xuanyuan", "Xuanyuan", "轩辕", "軒轅"),
  makeEntry("donghuang", "Donghuang", "东皇", "東皇"),
  makeEntry("qiankun", "Qiankun", "乾坤", "乾坤"),
  makeEntry("haotian", "Haotian", "昊天", "昊天"),
  makeEntry("shennong", "Shennong", "神农", "神農"),
  makeEntry("fuxiqin", "Fuxiqin", "伏羲琴", "伏羲琴"),
  makeEntry("kunlunjing", "Kunlunjing", "昆仑镜", "崑崙鏡"),
  makeEntry("kongtong", "Kongtong", "崆峒", "崆峒"),
  makeEntry("pangu", "Pangu", "盘古", "盤古"),
  makeEntry("yubi", "Yubi", "玉璧", "玉璧"),
  makeEntry("yucong", "Yucong", "玉琮", "玉琮"),
  makeEntry("qingping", "Qingping", "青萍", "青萍"),
  makeEntry("taie", "Taie", "太阿", "太阿"),
  makeEntry("zhanlu", "Zhanlu", "湛卢", "湛盧"),
  makeEntry("ganjiang", "Ganjiang", "干将", "干將"),
  makeEntry("moye", "Moye", "莫邪", "莫邪"),
  makeEntry("hetu", "Hetu", "河图", "河圖"),
  makeEntry("luoshu", "Luoshu", "洛书", "洛書"),
  makeEntry("shanhai", "Shanhai", "山海", "山海"),
  makeEntry("tianji-core", "Tianji", "天机", "天機"),

  // 五、清虚意境与云霄名号（20）
  makeEntry("fuyao", "Fuyao", "扶摇", "扶搖"),
  makeEntry("qingming", "Qingming", "青冥", "青冥"),
  makeEntry("qingwei", "Qingwei", "清微", "清微"),
  makeEntry("taisu", "Taisu", "太素", "太素"),
  makeEntry("taichu", "Taichu", "太初", "太初"),
  makeEntry("taishi", "Taishi", "太始", "太始"),
  makeEntry("hongmeng", "Hongmeng", "鸿蒙", "鴻蒙"),
  makeEntry("xuanhuang", "Xuanhuang", "玄黄", "玄黃"),
  makeEntry("yunmeng", "Yunmeng", "云梦", "雲夢"),
  makeEntry("canglan", "Canglan", "沧澜", "滄瀾"),
  makeEntry("xinghan", "Xinghan", "星汉", "星漢"),
  makeEntry("minghe", "Minghe", "明河", "明河"),
  makeEntry("liuxia", "Liuxia", "流霞", "流霞"),
  makeEntry("feilian", "Feilian", "飞廉", "飛廉"),
  makeEntry("qingniao", "Qingniao", "青鸟", "青鳥"),
  makeEntry("lingxi", "Lingxi", "灵犀", "靈犀"),
  makeEntry("xuance", "Xuance", "玄策", "玄策"),
  makeEntry("tiangong", "Tiangong", "天工", "天工"),
  makeEntry("zichen", "Zichen", "紫宸", "紫宸"),
  makeEntry("changgeng", "Changgeng", "长庚", "長庚"),
] as const;

export const CELESTIAL_WORKSPACE_NAMES = MYTHOLOGY_WORKSPACE_NAMES;
