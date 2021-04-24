<template>
	<div class="register">
		<div class="info">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="rule-form">
				<el-form-item prop="userName">
					<el-input clearable v-model="ruleForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="passWord">
					<el-input clearable type="password" show-password v-model="ruleForm.passWord" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
				<el-form-item prop="repeatPassword">
					<el-input clearable type="password" show-password v-model="ruleForm.repeatPassword" placeholder="请再次输入密码" prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
				<el-form-item>
					<el-row type="flex" justify="center">
						<el-button class="register-btn" size="medium" round type="primary" @click.prevent="register">
							注册
						</el-button>
					</el-row>

				</el-form-item>

			</el-form>
		</div>
	</div>
</template>

<script steup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
	name: 'register',
	setup() {
		const router = useRouter()
		let ruleForm = reactive({
			userName: '',
			passWord: '',
			repeatPassword: ''
		})
		const rules = ref({
			userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			passWord: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 6, message: '密码长度必须不小于6位', trigger: 'blur' }
			],
			repeatPassword: [
				{ required: true, message: '请输入验证码', trigger: 'blur' },
				{ type: 'number', message: '验证码必须是数字类型', trigger: 'blur' }
			]
		})

		const register = () => {}

		return {
			ruleForm,
			rules,
			register
		}
	}
}
</script>

<style lang="scss" scoped>
.info {
	width: 30vw;
	height: 48vh;
	background: url('/images/login.png') no-repeat center;
	background-size: cover;
	position: absolute;
	border-radius: 20px;
	right: 100px;
	top: 30vh;
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 750px) {
		width: 88vw;
		right: 25px;
		top: 22vh;
	}
	.rule-form {
		width: 80%;
		.register-btn {
			width: 200px;
		}
	}
}
</style>