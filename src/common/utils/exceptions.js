const mainException = ({message = "Internal Server Error" , cause = 500})=>{
    throw new Error(message , {cause})
}

export const NotFoundException = (message)=>{
    mainException({
        message , cause : 404
    })
}

export const ConflictException = (message)=>{
    mainException({
        message , cause : 409
    })
}

export const ForbiddenException = (message)=>{
    mainException({
        message , cause : 403
    })
}
export const UnAuthorizedException = (message)=>{
    mainException({
        message , cause : 401
    })
}
export const BadRequistException = (message)=>{
    mainException({
        message , cause : 400
    })
}
