<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :default-active="$route.path" active-text-color="#fff" text-color="#A7B1C2" background-color="#2F4050" @open="handleOpen" @close="handleClose" :collapse="sidebarSwitch">
      <template v-for="item in permission_routers" v-if="item.children">
        <router-link v-if="item.children.length==1" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path + '/' + item.children[0].path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <template v-else>
          <el-submenu :index="item.name||item.path" :key="item.name">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.children[0].meta.title}}</span>
            </template>
            <template v-for="child in item.children">
              <router-link :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path" >
                  <i class="el-icon-location"></i>
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
    min-height: 400px;
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
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      hasSelect(index, indexPath) {
        console.log('index', index)
        console.log('indexpath', indexPath)
      }
    }
  }
</script>
