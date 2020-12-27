<template>
	<div id="app">
		<!-- HEADER -->
		<h2>Expense Tracker</h2>

		<div class="container">
			<!-- BALANCE SUMMARY -->
			<div>
				<h4>Balance</h4>
				<h1 id="balance">{{ currentBalance | toUSD }}</h1>
			</div>
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

			<!-- TRANSACTION HISTORY -->
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

			<!-- ADD TRANSACTION -->
			<h4>Add Transaction</h4>
			<hr />
			<form @submit.prevent="pushTransaction">
				<div class="form-control">
					<label>Description</label>
					<input
						type="text"
						id="description"
						v-model="transaction.detail"
						placeholder="Detail of Transaction"
						required="required"
					/>
					<label>Transaction Amount</label>
					<input
						type="number"
						id="transactionamount"
						v-model="transaction.amount"
						placeholder="Dollar Value of Transaction"
						required="required"
					/>
					<button class="btn">Add Transaction</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				income: 0,
				expense: 0,
				currentBalance: 0,
				transaction: {
					id: 0,
					detail: '',
					amount: 0,
				},
				transactions: [],
			};
		},
		methods: {
			addIncome() {
				this.income += Number(this.transaction.amount);
				this.calculateBalanace();
			},
			addExpense() {
				this.expense += Math.abs(Number(this.transaction.amount));
				this.calculateBalanace();
			},
			calculateBalanace() {
				this.currentBalance = Number(this.income) - Number(this.expense);
			},
			pushTransaction() {
				var newtransaction = {
					id: new Date().getTime(),
					detail: this.transaction.detail,
					amount: this.transaction.amount,
				};
				if (this.transaction.amount > 0) {
					this.addIncome();
				} else if (this.transaction.amount < 0) {
					this.addExpense();
				} else {
					alert("Enter \"Transaction Amount\" other than \"0\"");
					return false;
				}
				this.transactions.push(newtransaction);
				this.resetState();
			},
			popTransaction(index) {
				for (var i = 0; i < this.transactions.length; i++)
					if (this.transactions[i].id === index) {
						this.refreshState(i);
						this.transactions.splice(i, 1);
						break;
					}
			},
			refreshState(index) {
				if (this.transactions[index].amount > 0) {
					this.income -= Math.abs(this.transactions[index].amount);
				} else if (this.transactions[index].amount < 0) {
					this.expense -= Math.abs(this.transactions[index].amount);
				} else {
					return false;
				}
				this.calculateBalanace();
			},
			resetState() {
				this.transaction.id = 0;
				this.transaction.detail = '';
				this.transaction.amount = 0;
			},
			sign(value) {
				return value > 0 ? '+' : '-';
			},
		},
		filters: {
			toUSD(value) {
				return Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(value);
			},
		},
	};
</script>

<style>
	#app {
		width: 310px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(1, 1);
		grid-auto-rows: minmax(auto, auto);
		grid-auto-columns: 140px;
		justify-content: center;
	}
	.col1 {
		grid-column: 1 / 2;
		grid-row: 1;
	}
	.col2 {
		grid-column: 2 / 2;
		grid-row: 1;
	}

	@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

	:root {
		--box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	}

	* {
		box-sizing: border-box;
	}

	body {
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		margin: 0;
		font-family: 'Lato', sans-serif;
	}

	.container {
		margin: 30px auto;
		width: 310px;
	}

	h1 {
		letter-spacing: 1px;
		margin: 0;
		text-align: center;
	}

	h2 {
		letter-spacing: 1px;
		margin: 0;
		text-align: center;
	}

	h3 {
		border-bottom: 1px solid #bbb;
		padding-bottom: 10px;
		margin: 40px 0 10px;
		text-align: center;
	}

	h4 {
		margin: 0;
		text-transform: uppercase;
		text-align: center;
	}

	.inc-exp-container {
		background-color: #fff;
		box-shadow: var(--box-shadow);
		padding: 20px;
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
	}

	.inc-exp-container > div {
		flex: 1;
		text-align: center;
	}

	.inc-exp-container > div:first-of-type {
		border-right: 1px solid #dedede;
	}

	.money {
		font-size: 20px;
		letter-spacing: 1px;
		margin: 5px 0;
	}

	.money.plus {
		color: #14eb0d;
		font-weight: bold;
	}

	.money.minus {
		color: #ff0000;
		font-weight: bold;
	}

	label {
		display: inline-block;
		margin: 10px 0;
		font-weight: bold;
	}

	input[type='text'],
	input[type='number'] {
		border: 1px solid #dedede;
		border-radius: 5px;
		display: block;
		font-size: 16px;
		padding: 10px;
		width: 100%;
	}

	.btn {
		cursor: pointer;
		background-color: DodgerBlue;
		box-shadow: var(--box-shadow);
		color: #fff;
		border: 0;
		display: block;
		font-size: 16px;
		margin: 10px 0 30px;
		padding: 10px;
		width: 100%;
		font-weight: bold;
	}

	.btn:focus,
	.delete-btn:focus {
		outline: 5px;
	}

	.list {
		list-style-type: none;
		padding: 0;
		margin-bottom: 40px;
	}

	.list li {
		background-color: #fff;
		box-shadow: var(--box-shadow);
		color: #000000;
		display: flex;
		justify-content: space-between;
		position: relative;
		padding: 10px;
		margin: 10px 0;
	}

	.list li.plus {
		border-right: 5px solid #14eb0d;
	}

	.list li.plus:hover {
		border-right: 5px solid #14eb0d;
		background-color: #14eb0d;
		color: #f7f7f7;
	}

	.list li.minus {
		border-right: 5px solid #ff0000;
	}

	.list li.minus:hover {
		border-right: 5px solid #ff0000;
		background-color: #ff0000;
		color: #f7f7f7;
	}

	.delete-btn {
		cursor: pointer;
		background-color: black;
		border: 0;
		color: #fff;
		font-size: 20px;
		line-height: 20px;
		padding: 2px 5px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-100%, -50%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.list li:hover .delete-btn {
		opacity: 1;
	}
</style>
