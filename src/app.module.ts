import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './core/auth/auth.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { UserModule } from './core/user/user.module';
import { UserProfileModule } from './core/user-profile-settings/user-profile-settings.module';
import { FileUploadModule } from './core/file-upload/file-upload.module';
import { BrandModule } from './core/brand/brand.module';
import { CategoryModule } from './core/category/category.module';
import { WearModule } from './core/wear/wear.module';
import { WearStoreModule } from './core/wear-store/wear-store.module';
import { CollectionModule } from './core/collection/collection.module';
import { WearCollectionModule } from './core/wear-collection/wear-collection.module';
import { WardrobeModule } from './core/wardrobe/wardrobe.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserSettingsModule,
    UserModule,
    UserProfileModule,
    FileUploadModule,
    BrandModule,
    CategoryModule,
    WearModule,
    WearStoreModule,
    CollectionModule,
    WearCollectionModule,
    WardrobeModule,
  ],
})
export class AppModule {}
