export enum Gender {
  Male = "male",
  Female = "female",
}

export enum RequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
  Completed = "completed",
}

export enum ProviderStatus {
  Pending = "pending",
  Verified = "verified",
  Declined = "declined",
  Blocked = "blocked",
}
export enum ActiveOrInactive {
  Active = "active",
  Inactive = "inactive",
}
export enum ActiveOrInactiveColor {
  active = "#209563",
  inactive = "#c34a41",
}

export enum ProviderStatusColor {
  pending = "#d27b3a",
  verified = "#209563",
  declined = "#c34a41",
  blocked = "#6f7983",
}

export enum WithdrawalPendingStatus {
  pending = 'pending',
  paid = 'paid',
  cancelled = 'cancelled',
}

export enum WithdrawalPendingStatusColor {
  pending = "#d27b3a",
  paid = "#209563",
  cancelled = "#c34a41",
}

export enum WithdrawalStatus {
  paid = 'paid',
  cancelled = 'cancelled',
}

export enum WithdrawalAllStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

export enum WithdrawalStatusColor {
  paid = "#209563",
  cancelled = "#c34a41",
}

export enum TransactionAllStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Cancelled = 'cancelled',
}