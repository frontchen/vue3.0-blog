<template>
	<router-view />
</template>

<script>
import { storeKey } from '/@/data'
export default {
	name: 'App',
	created() {
		this.resetStore()
	},
	mounted() {
		this.cosPlayTitle()
	},
	beforeUnmount() {
		document.removeEventListener('visibilitychange', this.changeTitle)
	},

	methods: {
		cosPlayTitle() {
			// 动态改变title
			let vm = this
			document.addEventListener('visibilitychange', vm.changeTitle)
		},
		changeTitle() {
			// 用户息屏、或者切到后台运行 （离开页面）
			if (document.visibilityState === 'hidden') {
				document.title = '等闲若得东风顾,不负春光不负卿'
			}
			// 用户打开或回到页面
			if (document.visibilityState === 'visible') {
				document.title = this.$t(this.$route.meta.title)
			}
		},
		// 解决防止刷新页面 vuex store 丢失的问题
		resetStore() {
			// 在页面加载时读取sessionStorage里的状态信息
			const sessionStore = window.sessionStorage.getItem(storeKey.vuexStore)
			if (sessionStore) {
				let store = {}
				Object.assign(store, this.$store.state, JSON.parse(sessionStore))
				this.$store.replaceState(store)
				window.sessionStorage.removeItem(storeKey.vuexStore)
			}

			// 在页面刷新时将vuex里的信息保存到sessionStorage里
			// ie、谷歌、360 页面刷新执行顺序 onbeforeunload -> onunload -> onload，关闭执行顺序 onbeforeunload -> onunload
			// firefox 页面刷新只执行 onunload，页面关闭只执行 onbeforeunload
			let eventName = 'beforeunload'
			const fireFox = navigator.userAgent.indexOf('Firefox') !== -1
			if (fireFox) {
				eventName = 'unload'
			}
			window.addEventListener(eventName, () => {
				// 根据 currentRefresh 判断是退出还是刷新
				const currentRefresh = this.$store.state.common.currentRefresh
				if (currentRefresh) {
					window.sessionStorage.setItem(
						storeKey.vuexStore,
						JSON.stringify(this.$store.state)
					)
				}
			})

			// console.log(JSON.stringify(this.$store.state))
		}
	}
}
</script>

<style lang="scss">
</style>
