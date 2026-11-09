import { hash , compare } from "bcrypt";
import { DB_CONFIG } from "../config/config.service.js";
import { hashEnum } from "../common/enums/hash.js"; 
import argon2 from "argon2"



export const myHash = async ({plainText , lib = hashEnum.pycrpt})=>{
    switch(lib){
    case hashEnum.pycrpt:
        return await hash(plainText , DB_CONFIG.SALT )
        break;
    case hashEnum.argon:
        return await argon2.hash(plainText)
}
}

export const myCompare = async ({plainText , encrypted , lib = hashEnum.pycrpt })=>{
        switch(lib){
    case hashEnum.pycrpt:
            return await compare(plainText , encrypted)
        break;
    case hashEnum.argon:
        return await argon2.verify(encrypted,plainText)
}

}