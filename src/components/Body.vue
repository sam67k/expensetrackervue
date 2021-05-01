<template>
	<!-- BODY -->
	<!-- <Body/> -->
	<div class="container">
		<!-- BALANCE SUMMARY -->
		<!-- <BalanceSummaryHeading/> -->
		<div>
			<h4>Balance</h4>
			<h1 id="balance">{{ currentBalance | toUSD }}</h1>
		</div>
		<BalanceSummaryDetail />
		<!-- TRANSACTION HISTORY -->
		<TransactionHistory />
		<!-- ADD TRANSACTION -->
		<AddTransaction />
	</div>
</template>

<script>
	import BalanceSummaryDetail from './BalanceSummaryDetail.vue';
	import TransactionHistory from './TransactionHistory.vue';
	import AddTransaction from './AddTransaction.vue';
	export default {
		name: 'Body',
		components: {
			BalanceSummaryDetail,
			TransactionHistory,
			AddTransaction,
		},
		computed: {
			currentBalance: {
				get() {
					return this.$store.state.currentBalance;
				},
			},
		},
	};
</script>