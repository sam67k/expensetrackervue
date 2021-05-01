<template>
	<div>
		<h4>Add Transaction</h4>
		<hr />
		<form @submit.prevent="pushTransaction">
			<div class="form-control">
				<label>Description</label>
				<input
					type="text"
					id="description"
					v-model.lazy="detail"
					placeholder="Detail of Transaction"
					required="required"
				/>
				<label>Transaction Amount</label>
				<input
					type="number"
					id="transactionamount"
					v-model="amount"
					placeholder="Dollar Value of Transaction"
					required="required"
				/>
				<button class="btn">Add Transaction</button>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'AddTransaction',
		methods: {
			pushTransaction() {
				this.$store.commit('pushTransaction');
			},
		},
		computed: {
			detail: {
				get() {
					return this.$store.state.transaction.detail;
				},
				set(value) {
					this.$store.commit('setDetail', value);
				},
			},
			amount: {
				get() {
					return this.$store.state.transaction.amount;
				},
				set(value) {
					this.$store.commit('setAmount', value);
				},
			},
		},
	};
</script>
