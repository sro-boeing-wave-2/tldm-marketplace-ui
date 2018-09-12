import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private localStorage: LocalStorageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.localStorage.retrieve("token");
        console.log("Token = ",token);
        if(token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer "+token)
            });
            return next.handle(cloned);
        } else {
            // console.log(req);
            // console.log(next);
            // console.log("I'm here");
            return next.handle(req);
        }
    }
}