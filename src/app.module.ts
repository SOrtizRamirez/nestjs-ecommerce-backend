import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/carts.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { PaymentsModule } from './payments/payments.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { SeedModule } from './seed/seed.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync(databaseConfig),
        ProductsModule,
        AuthModule,
        CategoriesModule,
        CartModule,
        OrdersModule, 
        UsersModule,
        AddressesModule,
        PaymentsModule,
        ShipmentsModule,
        SeedModule,
        ReviewsModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule { };
