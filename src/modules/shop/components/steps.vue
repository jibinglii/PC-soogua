<template>
	<div class="steps">
		<div class="cell">
			<img src="~$assets/images/xuanzeyouxi.png"
					 alt />
			<span>选择游戏</span>
		</div>
		<i>...</i>
		<div class="cell">
			<img src="~$assets/images/leixing.png"
					 alt />
			<span>选择类型</span>
		</div>
		<i>...</i>
		<div class="cell">
			<img src="~$assets/images/tianxiefabu.png"
					 alt />
			<span>基本信息</span>
		</div>
		<i>...</i>
		<div class="cell">
			<img src="~$assets/images/guige.png"
					 alt />
			<span>规格参数</span>
		</div>
		<i>...</i>
		<div class="cell">
			<img src="~$assets/images/chenggong.png"
					 alt />
			<span>发布成功</span>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	.steps {
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
		.cell {
			flex: 2;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 39px;
				height: auto;
				margin-right: 18px;
			}
		}
	}
</style>
