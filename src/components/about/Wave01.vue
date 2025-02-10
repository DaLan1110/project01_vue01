<script setup>
</script>

<template>
  <div class="about-timeline pt-5">
    <div class="row pb-5">
      <h2 style="color: #ffffff">Brand History</h2>
      <h1 class="about-timeline-title" style="font-size: 45px; color: #ffffff">
        品牌歷史
      </h1>
    </div>

    <div class="timeline-bgc">
      <div class="timeline">
        <ul>
          <li>
            <div class="span-content mb-2">
              <span>Jun. 2023</span>
            </div>
            <div class="content">
              <h3>全台突破3000店</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Mar. 2022</span>
            </div>
            <div class="content">
              <h3>夏季彰化企業總部落成(占地300坪、冷鏈、倉儲、物流、行政)</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Aug. 2021</span>
            </div>
            <div class="content">
              <h3>台灣複合式飲料店加盟大黑馬，單年度加盟突破1200家分店</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Oct. 2020</span>
            </div>
            <div class="content">
              <h3>全台首創雞蛋與水果結合</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Feb. 2019</span>
            </div>
            <div class="content">
              <h3>夏季加盟總部正式成立</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Nov. 2018</span>
            </div>
            <div class="content">
              <h3>打造夏季2.0版本，加盟店數突破700家</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Jul. 2016</span>
            </div>
            <div class="content">
              <h3>研發專利小蛋</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Dec. 2014</span>
            </div>
            <div class="content">
              <h3>成立「夏季」品牌，並開創彰化員林夏季旗艦店</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Sep. 2012</span>
            </div>
            <div class="content">
              <h3>第一家創始雞蛋冰店誕生</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Feb. 2009</span>
            </div>
            <div class="content">
              <h3>投入研發新飲品製作</h3>
            </div>
          </li>
          <li>
            <div class="span-content mb-2">
              <span>Jun. 2006</span>
            </div>
            <div class="content">
              <h3>彰化市場攤車起家</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.about-timeline {
  height: 175vh;
  width: 100vw;
  margin-top: 50px;
  margin-bottom: 150px;
  padding: 0;
}

.about-timeline-title {
  font-size: 35px;
  font-weight: 700;
  color: #9a91b8;
}

.timeline-bgc {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  perspective: 800px;
}

.timeline {
  width: 800px;
  color: #fff;
  padding: 30px 20px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, .5); */
}

.timeline ul {
  list-style-type: none;
  border-left: 2px solid #ffffff;
  padding: 10px 5px;
}

.timeline ul li {
  padding: 20px 20px;
  padding-left: 20px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
}

.timeline ul li .span-content {
  padding-left: 15px;
  text-align: left;
}

.timeline ul li span {
  display: inline-block;
  background-color: #d398d8;
  border-radius: 25px;
  padding: 2px 5px;
  font-size: 18px;
  text-align: center;
}

.timeline ul li .content {
  text-align: left; /* 將文字靠左對齊 */
  padding-left: 15px; /* 增加左側內距，讓文字遠離時間線 */
}

.timeline ul li .content h3 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
}

/* .timeline ul li .content p {
            padding: 5px 0px 15px 0px;
            font-size: 15px;
        } */

.timeline ul li:before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 50%;
  left: -11px;
  top: 28px;
  transition: 0.5s;
}

.timeline ul li:hover {
  background-color: #9a61a8;
}

.timeline ul li:hover:before {
  background-color: rgb(87, 88, 87);
  box-shadow: 0px 0px 10px 2px rgb(182, 182, 182);
}

@media (max-width: 768px) {
  .about-timeline {
    margin-bottom: 150px;
  }
}

@media (max-width: 300px) {
  .timeline {
    width: 100%;
    padding: 30px 5px 30px 10px;
  }

  .timeline ul li .content h3 {
    color: #ffffff;
    font-size: 15px;
  }
}
</style>
