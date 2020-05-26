<template>
	<div class="home">
		<div class="my-10">
			<h1>Supported Applications</h1>
			<p>List of applications supported that you can generate refresh token that can be used in your app</p>
		</div>
		<div>
			<v-card class="pb-3">
				<v-card-title>
					<v-icon class="mr-2" large>mdi-alarm</v-icon>Bickert Timetracker
				</v-card-title>

				<v-card-subtitle>Bickert Management Timetracker used to track employees logging hours per task on the Zoho Projects, and captures desktop screenshot every now and then.</v-card-subtitle>

				<v-card-actions>
					<v-btn color="primary" @click.prevent="authorize('zoho')">Get Authorization Now</v-btn>
				</v-card-actions>
			</v-card>
		</div>
					
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	methods: {
		authorize(type) {
			this.$router.push({ path: '/authorize', query: { type: type } })
		}
	}
}
</script>
