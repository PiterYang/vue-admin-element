<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :default-active="$route.path" active-text-color="#fff" text-color="#A7B1C2" background-color="#2F4050" @open="handleOpen" @close="handleClose" :collapse="sidebarSwitch">
      <template v-for="item in permission_routers" v-if="item.children">
        <router-link v-if="item.children.length==1" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path + '/' + item.children[0].path">
            <svg-icon class="svgStyle" v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
            <span slot="title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <template v-else>
          <el-submenu :index="item.name||item.path" :key="item.name">
            <template slot="title">
              <svg-icon class="svgStyle" v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              <span>{{item.meta.title}}</span>
            </template>
            <template v-for="child in item.children">
              <router-link :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path" >
                  <svg-icon class="svgStyle" v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span>{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 770px;
  }

</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    /*data() {
      return {
        isCollapse: this.$store.getters.sidebarSwitch,
//        permission_routers: this.$store.getters.permission_routers
      };
    },*/
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebarSwitch'
      ])
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      hasSelect(index, indexPath) {
      }
    }
  }
</script>
