'use strict';

const data = [{
  id: '1',
  product_name: 'アームレスチェア ホワイト',
  product_size: '幅85cm × 奥行92cm × 高さ90cm',
  category_id: '1',
  price: '40000',
  img_full_path: '01chair01.png'
},{
  id: '2',
  product_name: 'ベルベッドアームチェア ブルー',
  product_size: '幅82cm × 奥行90cm × 高さ80cm',
  category_id: '1',
  price: '45000',
  img_full_path: '01chair02.png'
},{
  id: '3',
  product_name: 'ウィングチェア グレー オットマン付',
  product_size: '幅80cm × 奥行88cm × 高さ95cm',
  category_id: '1',
  price: '50000',
  img_full_path: '01chair03.png'
},{
  id: '4',
  product_name: 'ベルベッドアームチェア ブラウン',
  product_size: '幅82cm × 奥行80cm × 高さ70cm',
  category_id: '1',
  price: '80000',
  img_full_path: '01chair04.png'
},{
  id: '5',
  product_name: '布張りソファ二人掛け ブラック',
  product_size: '幅160cm × 奥行90cm × 高さ60cm',
  category_id: '1',
  price: '60000',
  img_full_path: '01sofa01.png'
},{
  id: '6',
  product_name: '布張りソファ三人掛け ホワイト',
  product_size: '幅180cm × 奥行95cm × 高さ60cm',
  category_id: '1',
  price: '90000',
  img_full_path: '01sofa02.png'
},{
  id: '7',
  product_name: 'セラミック天板テーブル',
  product_size: '幅140cm × 奥行80cm × 高さ70cm',
  category_id: '2',
  price: '80000',
  img_full_path: '02table01.png'
},{
  id: '8',
  product_name: '天然木ダイニングテーブル 4人掛け',
  product_size: '幅160cm × 奥行80cm × 高さ70cm',
  category_id: '2',
  price: '100000',
  img_full_path: '02table02.png'
},{
  id: '9',
  product_name: 'ダイニングデーブル伸縮 8人掛け',
  product_size: '幅180cm × 奥行70cm × 高さ70cm',
  category_id: '2',
  price: '90000',
  img_full_path: '02table03.png'
},{
  id: '10',
  product_name: '両袖収納付デスク',
  product_size: '幅100cm × 奥行40cm × 高さ70cm',
  category_id: '2',
  price: '60000',
  img_full_path: '02table04.png'
},{
  id: '11',
  product_name: '天然木PCデスク 楕円形',
  product_size: '幅100cm × 奥行60cm × 高さ70cm',
  category_id: '2',
  price: '45000',
  img_full_path: '02table05.png'
},{
  id: '12',
  product_name: 'テーブルランプ ブラック',
  product_size: '幅32cm × 奥行32cm × 高さ36cm',
  category_id: '3',
  price: '20000',
  img_full_path: '03lamp01.png'
},{
  id: '13',
  product_name: 'ボールランプ',
  product_size: '幅20cm × 奥行20cm × 高さ26cm',
  category_id: '3',
  price: '15000',
  img_full_path: '03lamp02.png'
},{
  id: '14',
  product_name: 'ローズテーブルランプ',
  product_size: '幅30cm × 奥行30cm × 高さ38cm',
  category_id: '3',
  price: '18000',
  img_full_path: '03lamp03.png'
},{
  id: '15',
  product_name: 'テーブルランプ ゴールド',
  product_size: '幅34cm × 奥行34cm × 高さ40cm',
  category_id: '3',
  price: '17000',
  img_full_path: '03lamp04.png'
},{
  id: '16',
  product_name: 'クランプ式デスクライト',
  product_size: '幅20cm × 奥行20cm × 高さ30cm',
  category_id: '3',
  price: '10000',
  img_full_path: '03lamp05.png'
},{
  id: '17',
  product_name: '花瓶4点セット',
  product_size: '高さ20・25・30・28cm',
  category_id: '4',
  price: '8000',
  img_full_path: '04goods01.png'
},{
  id: '18',
  product_name: '室内観葉植物&スタンドセット',
  product_size: '(観葉植物)高さ16・16・18・20・28cm (スタンド)高さ50cm',
  category_id: '4',
  price: '7000',
  img_full_path: '04goods02.png'
},{
  id: '19',
  product_name: '木製フレーム',
  product_size: '幅40cm × 奥行2cm × 高さ26cm',
  category_id: '4',
  price: '4000',
  img_full_path: '04goods03.png'
},{
  id: '20',
  product_name: '収納編みかご3点セット',
  product_size: '高さ15・28・35cm',
  category_id: '4',
  price: '10000',
  img_full_path: '04goods04.png'
},{
  id: '21',
  product_name: 'クッションカバー3色セット',
  product_size: '幅45cm × 奥行45cm × 高さ1cm',
  category_id: '4',
  price: '6000',
  img_full_path: '04goods05.png'
}]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 全ての商品にcreatedAtとupdatedAtを付与する
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('mst_product', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mst_product', null, {});
  }
};
