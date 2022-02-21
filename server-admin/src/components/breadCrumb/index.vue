<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group appear name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ $t(item.meta.title) }}</span>
				<a v-else @click.prevent="handleLink(item)">{{
          $t(item.meta.title)
        }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script >
import { ref, defineComponent, watch, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'breadCrumb',
	setup() {
		const levelList = ref([])
		const route = useRoute()
		const router = useRouter()
		const isDashboard = (route) => {
			const name = route && route.name ? router.name : ''
			if (!name) {
				return false
			}
			return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
		}

		const getBreadcrumb = () => {
			let matched = route.matched.filter((item) => item.meta && item.meta.title)
			const first = matched[0]
			if (!isDashboard(first)) {
				matched = [
					{
						path: '/home',
						meta: { title: 'home' }
					}
				].concat(matched)
			}
			levelList.value = matched.filter(
				(item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
			)
		}

		getBreadcrumb()

		watch(
			() => route.path,
			() => getBreadcrumb()
		)

		const handleLink = (item) => {
			const { redirect, path } = item
			console.log(['item', redirect, path])
			if (redirect) {
				router.push(redirect.toString())
				return
			}
			router.push(path)
		}

		return { levelList, handleLink }
	}
})
</script>

<style lang="scss" scoped >
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 50px;
	margin-left: 8px;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
