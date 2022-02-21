<template>
	<div class="login">
		<div class="info">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="rule-form">
				<el-form-item prop="userName">
					<el-input clearable v-model="ruleForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="passWord">
					<el-input clearable type="password" show-password v-model="ruleForm.passWord" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
				</el-form-item>

				<el-form-item>
					<el-row type="flex" justify="center">
						<el-button class="login-btn" type="primary" @click.prevent="login">
							登录
						</el-button>
						<el-button class="login-btn" @click="register">注册</el-button>
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
	name: 'login',
	setup() {
		const router = useRouter()
		let ruleForm = reactive({
			userName: '',
			passWord: ''
		})
		const rules = ref({
			userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			passWord: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 6, message: '密码长度必须不小于6位', trigger: 'blur' }
			]
		})
		// 登录
		const login = () => {
			router.push('/home')
		}
		// 注册
		const register = () => {
			router.push('/register')
		}
		return {
			ruleForm,
			rules,
			login,
			register
		}
	}
}
</script>

<style lang="scss" scoped>
.info {
	width: 30vw;
	max-width: 500px;
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

		.login-btn {
			width: 100px;
		}
	}
}
</style>