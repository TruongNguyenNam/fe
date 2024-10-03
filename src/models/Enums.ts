// Enums
export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE'
}

export enum TokenType {
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    REGISTER = 'REGISTER'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    PROCESSING = 'PROCESSING'
}

export enum CustomerServiceStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED'
}

export enum NotificationStatus {
    UNREAD = 'UNREAD',
    READ = 'READ'
}

export enum ReturnStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum ShippingStatus {
    SHIPPED = 'SHIPPED',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED'
}

export enum PaymentStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    PENDING = 'PENDING'
}