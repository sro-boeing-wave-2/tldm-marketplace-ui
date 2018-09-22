import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private localStorage: LocalStorageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const addingDefaultHeaders = req.clone({
            headers: req.headers.set("Content-Type", "application/json")
        });
        const token = this.localStorage.retrieve("token");
        if(token) {
            const cloned = addingDefaultHeaders.clone({
                headers: req.headers.append("Authorization", `Bearer ${token}`)
            });
            return next.handle(cloned);
        } else {
            return next.handle(addingDefaultHeaders);
        }
    }
}