<template>
	<div class="grid inc-exp-container">
		<div class="col1">
			<h4>Income</h4>
			<p class="money plus">{{ income | toUSD }}</p>
		</div>
		<div class="col2">
			<h4>Expense</h4>
			<p class="money minus">{{ expense | toUSD }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BalanceSummaryDetail',
		computed: {
			income: {
				get() {
					return this.$store.state.income;
				},
			},
			expense: {
				get() {
					return this.$store.state.expense;
				},
			},
		},
	};
</script>
