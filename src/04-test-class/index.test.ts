import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

let bankAccount: BankAccount;
const initialBalance: number = 500;
const amount: number = 600;
const deposit: number = 500;
const withDraw: number = 300;

beforeEach(() => {
  bankAccount = getBankAccount(initialBalance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount).toBe(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      bankAccount.withdraw(amount);
    }
    catch(err: unknown) {
      expect(err).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      bankAccount.transfer(amount, new BankAccount(100));
    }
    catch(err: unknown) {
      expect(err).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      bankAccount.transfer(amount, bankAccount);
    }
    catch(err: unknown) {
      expect(err).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(deposit)).toBe(bankAccount);
  });

  test('should withdraw money', () => {
    expect(bankAccount.deposit(withDraw)).toBe(bankAccount);
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(100);
    bankAccount.transfer(50, newBankAccount);
    expect(newBankAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    await expect(bankAccount.fetchBalance()).resolves.toEqual(
      expect.any(Number),
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    await bankAccount.synchronizeBalance();
    const newBalace = bankAccount.getBalance();
    expect(newBalace).not.toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError,);
  });
});
