<template>
	<div class="print">
		<h4>Transaction History</h4>
		<hr />
		<ul class="list">
			<div v-for="t in transactions" :key="t.id">
				<li :class="t.amount > 0 ? 'plus' : 'minus'">
					{{ t.detail }}
					<span>{{ sign(t.amount) }}{{ Math.abs(t.amount) | toUSD }}</span>
					<button class="delete-btn" @click="popTransaction(t.id)">
						X
					</button>
				</li>
			</div>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'TransactionHistory',
		methods: {
			sign(value) {
				this.$store.commit('sign', value);
			},
			popTransaction(id) {
				this.$store.commit('popTransaction', id);
			},
		},
		computed: {
			transactions: {
				get() {
					return this.$store.state.transactions;
				},
			},
		},
	};
</script>
