import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, Observable, switchMap } from 'rxjs';
 import { Router } from '@angular/router';
import { LoaderService } from '../services/Loader.service';
import { StatusCode } from './Shared.enum';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;
    constructor( private router:Router
      ,private loadingService:LoaderService
      ) { }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.totalRequests++;
            this.loadingService.setLoading(true);
            return next.handle(req)
            .pipe(
            finalize(() => {
              this.totalRequests--;
              if (this.totalRequests == 0) {
                this.loadingService.setLoading(false);
              }
            })
          )
            .pipe(
            catchError((err) => {
              this.loadingService.setLoading(false);
              this.handleStatusCode(err,err.status,err.message);
              return err;
            })
          ) as Observable<HttpEvent<any>>;
      }

    handleStatusCode(err:HttpErrorResponse,statusCode:number,message:string)
    {
      // if(statusCode==StatusCode.NotAuthorized)
      // {
      //   // this.notificationService.ShowNotification(StatusResult.Falid, "You Are Not Authorized");
      //   // this.helperService.ClearSession()
      //   this.router.navigateByUrl('/login');

      // }
      // else if (statusCode == StatusCode.SessionTimeout) {
      //   // this.notificationService.ShowNotification(StatusResult.Falid, "Session Timeout");
      //   // this.helperService.ClearSession()
      //   this.router.navigateByUrl('/login');
      // }
      // else
      // {
      //   // this.notificationService.ShowNotification(StatusResult.Falid, message);

      // }
    }






  }
