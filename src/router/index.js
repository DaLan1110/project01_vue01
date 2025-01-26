import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/about/AboutView.vue'
import Advantage from '../views/advantage/AdvantageView.vue'
import Branch from '../views/branch/BranchView.vue'
import JoinUs from '../views/join-us/JoinUsView.vue'
import Menu from '../views/menu/MenuView.vue'
import Personal from '@/views/personal/PersonalView.vue'
import PersonalData from '@/views/personal/PersonalDataView.vue'
import OrderListView from '@/views/order/OrderListView.vue'
import OrderDataView from '@/views/order/OrderDataView.vue'
import ShoppingCartView from '@/views/order/ShoppingCartView.vue'
import ShoppingCartNoMidView from '@/views/order/ShoppingCartNoMidView.vue'
import { useMemberStore } from '@/stores/member'
import { useOrderStore } from '@/stores/order'
import { storeToRefs } from "pinia";

import { Modal } from 'bootstrap'; // 確保已正確導入

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/about/AboutView.vue')
      component: AboutView

    },
    {
      path: '/advantage',
      name: 'advantage',
      component: Advantage
    },
    // {
    //   path: '/branch',
    //   name: 'branch',
    //   component: Branch
    // },
    {
      path: '/join-us',
      name: 'join',
      component: JoinUs
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,

    },
    {
      path: '/personal/:id',
      name: 'personal',
      component: Personal,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: (to, from, next) => {
        const storedMemberData = localStorage.getItem("member_data");
        if (storedMemberData) {
          const memberData = JSON.parse(storedMemberData);
          const memberId = memberData.memberId; // 確保 localStorage 裡有 memberId
          const routeId = to.params.id;

          console.log('memberId', memberId)
          console.log('routeId', routeId)

          // 檢查路由的 :id 是否與 localStorage 中的 memberId 一致
          if (String(memberId) === routeId) {
            next(); // 允許進入
          } else {
            next({ name: 'home' }); // 沒有權限，重定向到首頁
          }
        } else {
          next({ name: 'home' }); // 若沒有登入資料，重定向到登入頁
        }
      },
      children: [
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: ShoppingCartView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: OrderListView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orderList/:orderId/orderData',
          name: 'orderData',
          component: OrderDataView,
          meta: {
            requiresAuth: true,
          },
          beforeEnter: async (to, from, next) => {
            const orderStore = useOrderStore();
            const { orders } = storeToRefs(orderStore);
            const routeOrderId = to.params.orderId;
            const memberId = to.params.id; // 取得當前會員的 id
            console.log('routeOrderId', routeOrderId)

            // 等待取得訂單資料
            await orderStore.getMemberOrderList(memberId); // 假設該方法會取得所有訂單並更新 store 的 orders

            // 查找 orders 陣列中是否有與 routeOrderId 匹配的訂單
            const matchedOrder = orders.value.find(order => String(order.id) === routeOrderId);

            if (matchedOrder) {
              // 如果找到匹配的訂單，檢查 order_state 是否為 "未下訂"
              if (matchedOrder.order_state === "未下訂") {
                // 如果是 "未下訂"，返回到 `/personal/:id/orderList`
                next({ path: `/personal/${memberId}/orderList` });
              } else {
                // 否則允許進入
                next();
              }
            } else {
              // 沒有匹配的訂單 ID，返回到 `/personal/:id/orderList`
              next({ path: `/personal/${memberId}/orderList` });
            }
          },
        },
        {
          path: 'personalData',
          name: 'personalData',
          component: PersonalData,
          meta: {
            requiresAuth: true,
          },
        },
      ]
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCartNoMid',
      component: ShoppingCartNoMidView,
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   // 不改變滾動位置，保持當前滾動位置
  //   return savedPosition || { x: 0, y: 0 };
  // },
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (to.query.area) {
      const areaElement = document.getElementById(to.query.area);
      if (areaElement) {
        // 返回一個包含滾動目標的物件
        return { el: areaElement, behavior: 'smooth' };
      }
    }
    return savedPosition || { x: 0, y: 0 };
  }
})

router.beforeEach(async (to, from, next) => {
  const memberStore = useMemberStore();
  try {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach((modal) => {
      const bsModal = Modal.getInstance(modal); // 使用已導入的 Modal
      if (bsModal) {
        bsModal.hide();
      }
    });
  } catch (error) {
    console.error("Error in beforeEach:", error);
  }

  // 確保在檢查身份驗證之前檢查用戶狀態
  await memberStore.checkAuthStatus();

  if (to.meta.requiresAuth) {
    // 如果路由需要身份驗證
    if (!memberStore.isAuthenticated) {
      // 如果用戶未登入，重定向到登入頁
      next({ name: 'home' });
    } else {
      // 如果用戶已登入，繼續導航
      next();
    }
  } else {
    // 不需要身份驗證的路由
    next();
  }
});


export default router