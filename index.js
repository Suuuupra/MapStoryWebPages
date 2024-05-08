// 初始化地图
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=076f75f61b8070d8b40fa10f55eed3e8'
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([106.1554, 35.8617]),
        zoom: 10
    })
});

const points = [
    [23.641667,37.948056],
    [20.929722,44.663333 ],
    [27.976667,53.902778 ],
    [-14.421944,14.588889],
    [102.69 ,18.046944],
    [31.5,30.09],
    [6.94 ,79.836944],
    [74.357778,31.524722],
    [-70.750833,-50.216944 ],
    [-66.724167,-24.091389 ],
    [73.528333, 4.175833],
    [-17.4675,14.718056 ],
    [33.557222, 25.972778],
    [17.796667,46.36 ],
    [79.525,6.927778 ],
    [-51.779167,-3.123611]
]

const cameraStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: './img/icon.png',
      imgsize: [1, 1],
      anchor: [0.5, 0.5],
    })
  });


function addCameraFeature(points) {
    const cameraSource = new ol.source.Vector();
    points.forEach(coordinates => {
      const pointGeometry = new ol.geom.Point(ol.proj.fromLonLat(coordinates, 'EPSG:3857'));
      const pointFeature = new ol.Feature({
        geometry: pointGeometry,
      });
      pointFeature.setStyle(cameraStyle);
      cameraSource.addFeature(pointFeature);
    });

    const cameraLayer = new ol.layer.Vector({
      source: cameraSource,
    });
    map.addLayer(cameraLayer)
}

addCameraFeature(points);

// 获取所有列表元素
var gridItems = document.querySelectorAll('.grid-item');
var introPage = document.querySelector('.intro-page');
var introImage = introPage.querySelector('img');
var introP = introPage.querySelector('p')
var introH = introPage.querySelector('h')

var dictionary = {
    "希腊比埃雷夫斯港": "欧洲的“南大门”，在其两千多年的历史里命运几经波折。自中国企业正式参与运营后，比港交出了十分亮眼的成绩单，已成为全球发展最快的集装箱港口之一。",
    "塞尔维亚斯梅代雷沃钢铁厂": "钢厂一度面临破产。2016年，中国河钢集团收购了斯梅代雷沃钢厂，给这座钢厂和它的5000名员工的生活带来了巨大变化。",
    "中白巨石工业园区": "中白工业园是中白两国共建“一带一路”的标志性工程。在两国政府和企业的大力支持下，中白工业园正在逐步发展成一个基础设施完备、具备全面招商引资条件的现代化园区。",
    "塞内加尔打井供水工程": "位于“西非之角”的塞内加尔，很多地方面临淡水资源短缺的问题。中国提供融资实施的塞内加尔乡村打井工程，惠及塞内加尔七分之一人口，为当地3000多人创造了就业机会。",
    "中老铁路": "老挝，素有“中南半岛屋脊”之称。突破重山封锁，“变陆锁国为陆联国”，是老挝人民的一大心愿。中老铁路2021年底通车。这条友谊、科技、绿色、开放的铁路，承载着中老两国人民的梦想，成为实现老挝人民心愿的契机。",
    "埃及新首都中央商务区": "在尼罗河畔的一片沙漠中，埃及新首都的天际线开始逐渐腾起。由中国企业承建的埃及新首都中央商务区项目中，最引人注目的就是将成为“非洲第一高楼”的标志塔项目。",
    "斯里兰卡科伦坡港口城": "斯里兰卡是古代海上丝绸之路的重要一站，无数载着中国香料和茶叶的船只曾在这里停靠，之后再驶向欧洲进行交易。眼下，这里兴建的大型投资项目科伦坡港口城，被称为两国共建“一带一路”的合作典范。",
    "巴基斯坦橙线地铁": "2020年开通运营的橙线地铁是巴基斯坦第一条也是目前唯一一条城铁线。橙线地铁项目也是中巴经济走廊的早期收获项目之一，是共建“一带一路”的标志性项目。",
    "阿根廷圣克鲁斯河水电站": "利用圣克鲁斯河水发电，是阿根廷人多年的期盼。如今，由中国与阿方企业组成的联营体在南美洲大陆最南端建设的水坝，正在帮助阿根廷人实现梦想。",
    "阿根廷高查瑞光伏发电站": "中企承建的阿根廷高查瑞300兆瓦光伏发电项目于2020年9月获得当地电力市场管理机构许可，正式投入商业运营。该项目是阿根廷最大的光伏发电项目，能解决至少6万户阿根廷家庭的用电需求。项目的建成让阿北部高原地区长期缺电的历史将得以改变，极大缓解了当地电力负荷的紧张状况，并降低当地民众用电价格，从而改善当地居民的生活条件。",
    "马尔代夫中马友谊大桥": "2018年，中国援建马尔代夫的中马友谊大桥通车。中马友谊大桥是马尔代夫历史上首座跨海大桥，结束了从首都马累与新兴城市、第二大岛胡鲁马累之间只能通过轮渡往来的历史。",
    "塞内加尔竞技摔跤场": "2018年7月22日，象征中塞友谊的塞内加尔竞技摔跤场正式移交。这座地标性建筑面积约1.8万平方米，可同时容纳2万名观众。塞内加尔竞技摔跤场位于达喀尔近郊，是中国在塞内加尔规模最大的援助项目，也是非洲首座现代化摔跤场。",
    "莫桑比克马普托大桥": "2018年11月，由中国路桥工程有限责任公司承建的马普托大桥及连接线项目经多年建设正式通车，莫桑比克人多年夙愿终于实现。无论是从历史维度还是使用寿命而言，马普托大桥都可以被称为“百年工程”。这座“梦想之桥”以全长和680米的主跨成为非洲第一大悬索桥，是莫桑比克总统口中的精品工程，更是民众眼中的城市新名片。",
    "匈牙利考波什堡100兆瓦光伏电站": "匈牙利考波什堡100兆瓦光伏电站项目由中国机械进出口（集团）有限公司投资兴建。项目并网运行后预计每年可发电1.3亿度，可节约4.5万吨标准煤，减少12万吨二氧化碳排放。",
    "斯里兰卡科伦坡莲花电视塔": "斯里兰卡科伦坡莲花电视塔是中斯两国在“一带一路”建设中的重要合作项目，由中国进出口银行提供大部分贷款，中国电子进出口有限公司负责承建。莲花电视塔塔高350米，是迄今南亚最高的电视塔。投入使用后，莲花塔不仅是一座发射信号、提供通信服务的电视塔，还具备餐饮、住宿、购物、观光等功能。",
    "巴西美丽山输电工程": "中国企业承建的美丽山输电工程极大缓解了巴西南部和东南部用电难问题。"
}

var coords_dic = {
    "希腊比埃雷夫斯港":[23.641667,37.948056],
    "塞尔维亚斯梅代雷沃钢铁厂":[20.929722,44.663333],
    "中白巨石工业园区":[27.976667,53.902778 ],
    "塞内加尔打井供水工程":[-14.421944,14.588889],
    "中老铁路": [102.69,18.046944],
    "埃及新首都中央商务区":[31.5,30.09],
    "斯里兰卡科伦坡港口城":[6.94 ,79.836944],
    "巴基斯坦橙线地铁":[74.357778,31.524722],
    "阿根廷圣克鲁斯河水电站": [-70.750833,-50.216944 ],
    "阿根廷高查瑞光伏发电站":[-66.724167,-24.091389 ],
    "马尔代夫中马友谊大桥":[73.528333, 4.175833],
    "塞内加尔竞技摔跤场": [-17.4675,14.718056 ],
    "莫桑比克马普托大桥":[33.557222, 25.972778],
    "匈牙利考波什堡100兆瓦光伏电站":[17.796667,46.36],
    "斯里兰卡科伦坡莲花电视塔":[79.525,6.927778 ],
    "巴西美丽山输电工程":[-51.779167,-3.123611]
}
// 遍历每个列表元素
gridItems.forEach(function(item) {
    // 添加点击事件
    item.addEventListener('click', function() {
        // 获取被点击图片的路径
        var imagePath = this.querySelector('img').src;
        var imagealt = this.querySelector('img').alt;

        introP.textContent = dictionary[imagealt]
        introH.textContent = imagealt
        // 将路径应用到介绍页面的图片上
        introImage.src = imagePath;

        // 显示介绍页面
        introPage.style.left = '0'; // 从左侧滑入
        let center = coords_dic[imagealt]
        panToCoordinate(ol.proj.fromLonLat(center, 'EPSG:3857'), 10)
    });
});

// 为返回按钮添加点击事件
var returnBtn = document.querySelector('.return-btn');
returnBtn.addEventListener('click', function() {
    // 隐藏介绍页面
    introPage.style.left = '-100%'; // 滑出到左侧
});

function panToCoordinate(coordinate, zoomLevel, duration = 1000) {
    map.getView().animate({
        center: coordinate,
        zoom: zoomLevel,
        duration: duration
    });
}