<template>
	<div>

		<div class="div-404">
			<img src="./assets/images/404.png"
					 alt="">
			<p>
				{{ $route.query['reason'] }}
			</p>
		</div>
	</div>
</template>

<script>
	// import XHeader from "$components/XHeader";
	export default {
		name: 'not-found',
		components: {
			// XHeader
		},
		methods: {
		},
		mounted () {
		}
	}
</script>

<style lang="scss" scoped>
	.div-404 {
		height: calc(100vh - 50px);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: white;
		img {
			width: 20%;
			height: auto;
		}
	}
</style>
