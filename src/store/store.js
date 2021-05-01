import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		income: 0,
		expense: 0,
		currentBalance: 0,
		transaction: {
			id: 0,
			detail: '',
			amount: 0,
		},
		transactions: [],
	},
	mutations: {
		addIncome(state) {
			state.income += Number(state.transaction.amount);
			this.commit('calculateBalanace');
		},
		addExpense(state) {
			state.expense += Math.abs(Number(state.transaction.amount));
			this.commit('calculateBalanace');
		},
		calculateBalanace(state) {
			state.currentBalance = Number(state.income) - Number(state.expense);
		},
		pushTransaction(state) {
			var newtransaction = {
				id: new Date().getTime(),
				detail: this.state.transaction.detail,
				amount: this.state.transaction.amount,
			};
			if (state.transaction.amount > 0) {
				this.commit('addIncome');
			} else if (state.transaction.amount < 0) {
				this.commit('addExpense');
			} else {
				alert('Enter "Transaction Amount" other than "0"');
				return false;
			}
			state.transactions.push(newtransaction);
			this.commit('resetState');
		},
		popTransaction(state, index) {
			for (var i = 0; i < state.transactions.length; i++) {
				if (state.transactions[i].id === index) {
					this.commit('refreshState', i);
					state.transactions.splice(i, 1);
					break;
				}
			}
		},
		refreshState(state, index) {
			if (state.transactions[index].amount > 0) {
				state.income -= Math.abs(state.transactions[index].amount);
			} else if (state.transactions[index].amount < 0) {
				state.expense -= Math.abs(state.transactions[index].amount);
			} else {
				return false;
			}
			this.commit('calculateBalanace');
		},
		resetState() {
			this.state.transaction.id = 0;
			this.state.transaction.detail = '';
			this.state.transaction.amount = 0;
		},
		sign(value) {
			return value > 0 ? '+' : '-';
		},
		setDetail(state, value) {
			state.transaction.detail = value;
		},
		setAmount(state, value) {
			state.transaction.amount = value;
		},
	},
});

export default store;
