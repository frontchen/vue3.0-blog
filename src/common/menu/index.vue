<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<el-menu :default-active="activeMenu" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" :unique-opened="false" active-text-color="#409EFF" :collapse-transition="false" mode="vertical">
			<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
		</el-menu>
	</el-scrollbar>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SidebarItem from '/@/common/menu/SidebarItem.vue'

export default defineComponent({
	name: 'sidebar',
	components: { SidebarItem },
	setup() {
		const router = useRouter().options.routes

		const store = useStore()

		const route = useRoute()

		const activeMenu = computed(() => {
			const { meta, path } = route
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		})
		const algorithm = {
			increaseIndexes(val) {
				return Object.keys(val)
					.map((v) => {
						return {
							...val[v],
							key: v
						}
					})
					.filter((v) => v.meta.showLink)
			}
		}
		return {
			routes: computed(() => algorithm.increaseIndexes(router)),
			activeMenu,
			isCollapse: computed(() => !store.getters.sidebar.opened)
		}
	}
})
</script>
