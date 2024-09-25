<template>
    <div class="navbar" :style="{ 'background': '#08619F' }">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!settingsStore.topNav" />
        <!--    <hamburger v-if="!appStore.sidebar.hide" id="hamburger-container" :is-active="appStore.sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
        <div style="display: flex;margin-left: 10px">
            <div class="custom-logo">
                <a href="/">
                    <img v-if="logo" :src="logo" />
                    <h1>樊桥水库信息管理系统</h1>
                </a>
            </div>
        </div>
        <top-nav id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav" />
        <div class="right-menu">
            <template v-if="appStore.device !== 'mobile'">
                <!--        <header-search id="header-search" class="right-menu-item" />-->
                <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
                <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip> -->
                <div style="height: 70%; margin-right: 20px">
                    <el-popover placement="bottom" width="300" :visible="visible">
                        <div style="text-align: right; margin: 0">
                            123
                        </div>
                        <template #reference>
                            <el-badge :value="infoNum" :max="99" style="height: 100%;">
                                <Bell style="width: 30px; height: 40px; color: #fff; cursor: pointer;"
                                    @click="visible = !visible" />
                            </el-badge>
                        </template>
                    </el-popover>
                </div>
            </template>
            <div class="avatar-container">
                <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
                    <div class="avatar-wrapper">
                        <img :src="userStore.avatar" class="user-avatar" />
                        <span>{{ userStore.name }}</span>
                        <el-icon><caret-bottom style="color:#fff;" /></el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <router-link to="/user/profile">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                            </router-link>
                            <!-- <el-dropdown-item command="setLayout">
                                <span>布局设置</span>
                            </el-dropdown-item> -->
                            <el-dropdown-item divided command="logout">
                                <span>退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import logo from '@/assets/logo/logo.png'
import { ElMessageBox } from 'element-plus'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import HeaderSearch from '@/components/HeaderSearch'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import { ref, watch } from "vue";

const visible = ref(false)
const infoNum = ref(100)
const appStore = useAppStore()
const userStore = useUserStore();
const settingsStore = useSettingsStore()
const isCollapse = computed(() => !appStore.sidebar.opened);
// 主题颜色
const theme = computed(() => settingsStore.theme);
function toggleSideBar() {
    appStore.toggleSideBar()
}

function handleCommand(command) {
    switch (command) {
        case "setLayout":
            setLayout();
            break;
        case "logout":
            logout();
            break;
        default:
            break;
    }
}

function logout() {
    ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        userStore.logOut().then(() => {
            location.href = '/login';
        }).catch(() => {
            location.href = '/login';
        })
    }).catch(() => { });
}

const emits = defineEmits(['setLayout'])
function setLayout() {
    emits('setLayout');
}
</script>

<style lang='scss' scoped>
.el-menu {
    background: transparent;

    :deep(.el-menu-item) {
        color: #fff !important;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        color: #fff !important;
    }

    :deep(.el-menu-item:hover) {
        background: linear-gradient(180deg, rgba(116, 167, 255, 0.4) 0%, rgba(0, 167, 244, 0.4) 100%) !important;
    }

    :deep(.is-active) {
        background: linear-gradient(180deg, rgba(116, 167, 255, 0.4) 0%, rgba(0, 167, 244, 0.4) 100%);
        border-bottom: 3px solid #fff !important;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.12);
        border-image: linear-gradient(to right, #00A7F4, #fff, #00A7F4) 1;
        opacity: 1;
    }

    :deep(.is-active) {
        background: linear-gradient(180deg, rgba(116, 167, 255, 0.4) 0%, rgba(0, 167, 244, 0.4) 100%) !important;
    }
}

.navbar {
    display: flex;
    justify-content: space-between;
    height: 65px;
    overflow: hidden;
    position: relative;

    //background: url("../../assets/images/top.png") no-repeat center center;
    //background-size: 100% 100%;
    .custom-logo {
        display: flex;
        align-items: center;
        width: auto;

        a {
            display: flex;
            align-items: center;

            img {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                margin-right: 12px;
            }

            h1 {
                display: inline-block;
                margin: 0;
                color: #fff;
                font-weight: 600;
                line-height: 50px;
                font-size: 24px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                vertical-align: middle;
            }
        }
    }

    .hamburger-container {
        line-height: 60px;
        height: 100%;
        float: left;
        color: #fff;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
    }

    .breadcrumb-container {
        float: left;
    }

    .topmenu-container {
        //position: absolute;
        //left: 50px;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        //float: right;
        height: 100%;
        line-height: 75px;
        display: flex;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 4px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 40px;

            .avatar-wrapper {
                position: relative;
                display: flex;
                align-content: center;
                align-items: center;
                height: 65px;
                // line-height: 65px;
                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    margin-right: 10px;
                }
                span{
                    color: #fff;
                    margin-right: 5px;
                }
                i {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>