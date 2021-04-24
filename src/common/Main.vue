<template>
	<div :class="['app-wrapper',classes]" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<!-- 侧边栏 -->
		<main-menu class="sidebar-container" />
		<div class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<!-- 顶部导航栏 -->
				<main-header />
			</div>
			<!-- 主体内容 -->
			<main-layout />
		</div>
		<!-- 系统设置 -->
		<main-setting />
	</div>
</template>

<script >
import MainHeader from '/@/common/MainHeader.vue'
import MainMenu from '/@/common/menu/index.vue'
import MainLayout from '/@/common/MainLayout.vue'
import MainSetting from '/@/common/MainSetting.vue'
import {
	ref,
	reactive,
	computed,
	toRefs,
	watchEffect,
	onMounted,
	onBeforeMount,
	onBeforeUnmount
} from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'layout',
	components: {
		MainHeader,
		MainMenu,
		MainLayout,
		MainSetting
	},
	setup() {
		const store = useStore()

		const WIDTH = ref(992)

		const set = reactive({
			sidebar: computed(() => {
				return store.state.app.sidebar
			}),

			device: computed(() => {
				return store.state.app.device
			}),

			fixedHeader: computed(() => {
				return store.state.settings.fixedHeader
			}),

			classes: computed(() => {
				return {
					hideSidebar: !set.sidebar.opened,
					openSidebar: set.sidebar.opened,
					withoutAnimation: set.sidebar.withoutAnimation,
					mobile: set.device === 'mobile'
				}
			})
		})

		watchEffect(() => {
			if (set.device === 'mobile' && !set.sidebar.opened) {
				store.dispatch('app/closeSideBar', { withoutAnimation: false })
			}
		})

		const handleClickOutside = () => {
			store.dispatch('app/closeSideBar', { withoutAnimation: false })
		}

		const $_isMobile = () => {
			const rect = document.body.getBoundingClientRect()
			return rect.width - 1 < WIDTH.value
		}

		const $_resizeHandler = () => {
			if (!document.hidden) {
				const isMobile = $_isMobile()
				store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

				if (isMobile) {
					store.dispatch('app/closeSideBar', { withoutAnimation: true })
				}
			}
		}

		onMounted(() => {
			const isMobile = $_isMobile()
			if (isMobile) {
				store.dispatch('app/toggleDevice', 'mobile')
				store.dispatch('app/closeSideBar', { withoutAnimation: true })
			}
		})

		onBeforeMount(() => {
			window.addEventListener('resize', $_resizeHandler)
		})

		onBeforeUnmount(() => {
			window.removeEventListener('resize', $_resizeHandler)
		})

		return {
			...toRefs(set),
			handleClickOutside
		}
	}
}
</script>

<style lang="scss" scoped>
@mixin clearfix {
	&:after {
		content: '';
		display: table;
		clear: both;
	}
}
$sideBarWidth: 210px;

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.mobile .fixed-header {
	width: 100%;
}
</style>
