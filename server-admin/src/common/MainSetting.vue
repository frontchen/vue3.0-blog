<template>
	<panel>
		<el-divider>界面显示</el-divider>
		<ul class="setting">
			<li>
				<span>灰色模式</span>
				<el-switch v-model="greyVal" active-text="开" inactive-text="关" @change="greyChange"></el-switch>
			</li>
		</ul>
	</panel>
</template>

<script>
import panel from '/@/common/Panel.vue'
import { reactive, toRefs } from 'vue'
import { storageLocal } from '/@/services/storage'
export default {
	name: 'setting',
	components: { panel },
	setup() {
		const localOperate = (key, value, model) => {
			model && model === 'set'
				? storageLocal.setItem(key, value)
				: storageLocal.getItem(key)
		}

		const settings = reactive({
			greyVal: storageLocal.getItem('greyVal')
		})

		settings.greyVal === null
			? localOperate('greyVal', false, 'set')
			: document.querySelector('html')?.setAttribute('class', 'html-grey')

		// 灰色模式设置
		const greyChange = value => {
			if (value) {
				localOperate('greyVal', true, 'set')
				document.querySelector('html')?.setAttribute('class', 'html-grey')
			} else {
				localOperate('greyVal', false, 'set')
				document.querySelector('html')?.removeAttribute('class')
			}
		}

		return {
			...toRefs(settings),
			localOperate,
			greyChange
		}
	}
}
</script>

<style lang="scss" scoped>
.setting {
	width: 100%;
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 16px;
	}
}
:deep(.el-divider__text) {
	font-size: 16px;
	font-weight: 700;
}
</style>
