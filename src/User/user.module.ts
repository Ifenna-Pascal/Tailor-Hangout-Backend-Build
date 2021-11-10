import { Module } from '@nestjs/common';
import { userSchema, User } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = userSchema;
          schema.pre<User>('save', function (next) {
            var user = this;
            bcrypt.genSalt(10, (err, salt) => {
              if (err) return next(err);
              console.log(salt);
              bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
              });
            });
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
