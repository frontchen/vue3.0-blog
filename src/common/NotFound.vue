<template>
	<div class="wscn-http404-container">

	</div>
</template>

<script>
import { onBeforeMount } from 'vue'

export default {
	name: '404',
	setup() {
		onBeforeMount(() => {
			const hostName = window.location.host
			let scriptDom = document.createElement('script')
			scriptDom.type = 'text/javascript'
			scriptDom.src =
				'//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js'
			scriptDom.setAttribute('homePageUrl', `http://${hostName}/home`)
			scriptDom.setAttribute('homePageName', `回到首页`)
			document.getElementsByTagName('head')[0].appendChild(scriptDom)
		})
		return {}
	}
}
</script>
