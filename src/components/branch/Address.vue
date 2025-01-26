<script setup>
</script>

<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="branch-table-th">
            <p class="branch-table-th-en">Name</p>
            <p class="branch-table-th-ch">店名</p>
          </th>
          <th class="branch-table-th">
            <p class="branch-table-th-en">Telephone</p>
            <p class="branch-table-th-ch">電話</p>
          </th>
          <th class="branch-table-th">
            <p class="branch-table-th-en">Address</p>
            <p class="branch-table-th-ch">地址</p>
          </th>
          <th>
            <p class="branch-table-th-en">Map</p>
            <p class="branch-table-th-ch">地圖</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="branch-table-td">台北市中正庭店</td>
          <td class="branch-table-td">02-23518699</td>
          <td class="branch-table-td">100台北市中正區抗州南路二段56號</td>
          <td style="vertical-align: middle">
            <button class="btn branch-map-btn">地圖</button>
          </td>
        </tr>
        <tr>
          <td class="branch-table-td">台北市中正庭店</td>
          <td class="branch-table-td">02-23518699</td>
          <td class="branch-table-td">100台北市中正區抗州南路二段56號</td>
          <td style="vertical-align: middle">
            <button class="btn branch-map-btn">地圖</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.branch-table-th-en {
  font-size: 15px;
  margin-bottom: 0;
  color: #6c6c6c;
}

.branch-table-th-ch {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 0;
  color: #7b7b7b;
}

.branch-map-btn {
  background-color: #9a91b8;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  width: 150px;
}

.branch-map-btn:hover,
.branch-map-btn:active {
  background-color: #9a91b8;
  color: #ffffff;
  opacity: 0.8;
}

.branch-table-th {
  text-align: left;
}

.branch-table-td {
  text-align: left;
  font-size: 18px;
  vertical-align: middle;
  padding: 20px 20px !important;
}
</style>