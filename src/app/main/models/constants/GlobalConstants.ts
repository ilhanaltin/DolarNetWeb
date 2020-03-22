export const GlobalConstants = {
    baseCurrency: "TRY",
    baseCurrencyCripto: "USD",
    symbols: ['TRY','USD','EUR','GBP','CHF','CAD','RUB','AED','AUD','DKK','SEK','NOK','JPY','KWD','ZAR','OMR','MYR',
    'PHP','QAR','SYP','RSD','UAH','TWD','MDL','PEN','SGD','MKD','UYU','PKR','THB','SAR','ILS','BHD','MXN','NZD','IRR',
    'CSK','BGN','ARS','BRL','AZN','CLP','RON','CRC','HKD','BAM','ISK','KZT','LKR','DZD','MAD','JOD','LTL','LYD','INR',
    'IDR','IQD','CNY','HUF','BYR','PLN','EGP','ALL','KRW','COP','LVL','HRK','LBP','GEL'],
    symbolNames: ['Türk Lirası','Amerikan Doları','Euro','İngiliz Sterlini','İsviçre Frangı','Kanada Doları','Rus Rublesi','Birleşik Arap Emirlikleri Dirhemi',
    'Avustralya Doları','Danimarka Kronu','İsveç Kronu','Norveç Kronu','100 Japon Yeni','Kuveyt Dinarı','Güney Afrika Randı',
    'Umman Riyali','Malezya Ringgiti','Filipinler Pesosu','Katar Riyali','Suriye Lirası','Sırbistan Dinarı','Ukrayna Grivnası',
    'Yeni Tayvan Doları','Moldovya Leusu','Peru İnti','Singapur Doları','Makedonya Dinarı','Uruguay Pesosu','Pakistan Rupisi',
    'Tayland Bahtı','Suudi Arabistan Riyali','İsrail Şekeli','Bahreyn Dinarı','Meksika Pesosu','Yeni Zelanda Doları','İran Riyali',
    'Çek Korunası','Bulgar Levası','Arjantin Pesosu','Brezilya Reali','Azerbaycan Manatı','Şili Pezosu','Romanya Leyi','Kostarika Kolonu',
    'Hong Kong Doları','Bosna Hersek Markı','İzlanda Kronası','Kazak Tengesi','Sri Lanka Rupisi','Cezayir Dinarı','Fas Dirhemi',
    'Ürdün Dinarı','Litvanya Litası','Libya Dinarı','Hindistan Rupisi','Endonezya Rupiahi','Irak Dinarı','Çin Yuanı','Macar Forinti',
    'Belarus Rublesi','Polonya Zlotisi','Mısır Lirası','Arnavutluk Leki','Güney Kore Wonu','Kolombiya Pesosu','Letonya LAtı',
    'Hırvat Kunası','Lübnan Lirası','Gürcistan Larisi'],
    Alis:1,
    Satis:2,
    goldTypes: ['Çeyrek Altın','Yarım Altın','Tam Altın','Cumhuriyet Altını','ONS','Gram Altın','Ata Altın',
    '14 Ayar Altın','18 Ayar Altın','22 Ayar Bilezik','Gremse Altın','Gümüş','Beşli Altın','İkibuçuk Altın'],
    goldTypesShort: ['Çeyrek','Yarım','Tam','Cumhuriyet','ONS','Gram','Ata','14 Ayar A.','18 Ayar A.','22 Ayar B.',
    'Gremse','Gümüş','Beşli','İkibuçuk'],
    criptoTypes: ['BTC','ETH','XRP','USDT','BCH','LTC','EOS','BNB','BSV','XTZ','XLM','ADA','TRX','XMR','LEO','ATOM','LINK',
    'HT','NEO','MIN','MIOTA','MKR','USDC','DASH','ETC','ONT','CRO','HEDG','XEM','VET','DOGE','ZEC','BAT','PAX','SNX','DCR',
    'QTUM','TUSD','FTT','CENNZ','ZRX','ALGO','RVN','REP','EKT','HOT','ABBC','OMG','SEELE','NANO','BTG','ZB','DGB','KCS',
    'VSYS','THETA','LUNA','BTM','LSK','XVG','BTT','BCD','MOF','SC','MCO','KMD','SXP','ICX','IOST','WAVES','ENJ','DX','MONA',
    'BCN','NEXO','HC','QNT','BTS','SAI','ZIL','NRG','MAID','ZEN','STEEM','ARDR','AE','DGD','RLC','CRPT','SLV','MATIC','SNT',
    'EURS','SOLVE','ETN','ENG','KNC','GNT','NPXS','GRIN','NEX','AOA','FET','CHZ','REN','TOMO','ELF','STRAT','DGTX','ETP','BEAM',
    'RIF','NEW','GXC','MANA','ELA','ILC','FCT','HPT','PPT','HYN','FUN','BRD','HBAR','WICC','LRC','WTC','LAMB','RCN','NAS',
    'AION','FTM','NULS','R','TT','ARK','WAXP','DRG','IGNIS','IOTX','WAN','YOU','WIN','DPT','QASH','LOOM','TNT','DCN','BUSD',
    'POWR','DIVI','LOKI','ONE','EDC','GT','RDD','TRUE','CVC','XMX','BNT','BHP','PAI','ERD','STORJ','DAG','MTL','ROX','CND','ANT',
    'GNO','DENT','SAN','OCEAN','CELR','GO','GRS','TEL','ORBS','LEND','CS','NXS','ODE','SYS','ABT','LBA','PIVX','WXT','COCOS','RET',
    'MEDX','EDO','KAN','FX','SUSD','ADN','DATA','CTXC','VTC','GAS'],
    UserRoles: { Admin: 1, Editor: 2, User: 3 },
    PositionType: { Currency: 1, Gold: 2, Cripto: 3} ,
    UserLoginType: { Normal: 1, Google: 2, Facebook: 3} ,
    DatePeriod: { Day: 1, Week: 2, Month: 3, SixMonth: 4, Year: 5, TenYear: 6},
    PostCategories: { Doviz: 1, Altin: 2, Kripto: 3, Gundem: 4, Borsa: 5, Emtia: 6, EnSon: 7, EnPopuler: 8, EkonIndikator: 9,
        Ekonomi: 10, Dunya: 11, Turkiye: 12, Blog: 13 },
    PostCategoriesLongName: ['Döviz','Altın','Kripto Paralar','Gündem','Borsa','Emtia','En Son',
    'En Popüler','Ekonomik İndikatörler','Ekonomi','Dünya','Türkiye','Blog'],
    PostCategoriesLongNameForUrl: ['doviz','altin','kripto-paralar','gundem','borsa','emtia','en-son',
    'en-populer','ekonomik-indikatorler','ekonomi','dunya','turkiye','blog']
    };    