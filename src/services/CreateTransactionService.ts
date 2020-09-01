import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && total < transaction.value) {
      throw Error('You do not have enough balance');
    }

    const newTransaction = this.transactionsRepository.create(transaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
