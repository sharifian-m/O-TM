import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq:any[]=[
    {
      question:'اُتامین چیست؟',
      answer:`اپلکیشن بازاریابی و سفارشگیری کالاهای سوپرمارکتی به صورت عمده 
     
      `,
      active:false,
      items:[
        '⦁	شعار اُتامین :  مرجع تخصصی عمده فروشی کالا'
      ],
      height:100
    },
    
    {
      question:'هدف o’tamin  چیست؟ ',
      answer:'ایجاد یک روش مکمل در کنار روشهای سنتی برای ارتقای فروش و کاهش هزینه ها',
      active:false,
      items:[],
      height:100
    },
    {
      question:'	چه چیزی بازاریابی میکنیم؟ ',
      answer:'در فاز اول کالاهای سوپرمارکتی',
      active:false,
      items:[
        '⦁	تعریف مشتری: هر فروشگاه یا سازمانی که کالایی به صورت عمده خرید میکند مثل سوپرمارکتها، رستوران، دکه، فست فود، پروتئینها، سازمان، ارگان و تالارها...',
        '⦁	تعریف تأمین کننده: تولیدکنندگان یا واردکنندگان موادغذایی، شوینده، سلولزی و هر کالای دیگری که در سوپرمارکتها به فروش میرسد.'

      ],
      height:250

    },

    {
      question:'	چگونه بازاریابی میکنیم؟  ',
      answer:'',
      active:false,
      items:[
        `⦁	ارائه ی یک پنل کاربری از سایت اُتامین به تولیدکنندگان
        تأمین کننده محصول خود را مطابق شرایط و سیاستهای فروش خودش (قیمت عمده فروشی، زمان تحویل، نحوه تسویه حساب) ثبت میکند و بدون هیچ گونه تغییر از سمت o’tamin در اپ نمایش داده میشود. 
        `,
        `⦁	نصب اپ o’tamin  برای سوپرمارکت و فروشگاه، رستوران، هتل، کترینگ، دکه، قنادی و پروتئینها`,
        `فروشگاهها در اپ محصولاتی را که تأمین کنندگان قبلاً ثبت کرده اند، مشاهده و بنا به نیاز خود درخواست خرید ثبت می نمایند. هر زمان که فروشگاه درخواست خرید ثبت کند تأمین کننده در پنل خود مشاهده میکند و در صورت تأیید، سفارش را ارسال مینماید.`
      ],
      height:390

    },
    {
      question:'کالا چگونه ارسال میشود ؟ ',
      answer:'تأمین کننده با سیستم توزیع خود کالا را به فروشگاه ارسال مینماید.',
      active:false,
      items:[],
      height:100

    },
    
    {
      question:'		وجه کالا چگونه دریافت میشود ؟',
      answer:'  فروشنده یا رانندهای که بار را تحویل میدهد وجه کالا را با دستگاه پوز خود شرکت دریافت میکند یا در صورت فروش اعتباری چک فروشگاه را تحویل میگیرد.',
      active:false,
      items:[],
      height:100

    },
    {
      question:'		امکان خرید اعتباری وجود دارد؟  ',
      answer:`بله`,
      items:[
        `⦁	تأمین کننده گزینه فروش اعتباری را فعال میکند و در اپ نمایش داده میشود.`,
        `⦁	فروشگاه در صورت تمایل هنگام ارسال سفارش درخواست خرید اعتباری میدهد.`,
        `⦁	تأمین کننده مجاز به تأیید یا رد درخواست خرید اعتباری فروشگاه است.`,
        `⦁	در صورت تأیید از سوی تأمین کننده، تحویلدهنده کالا، چک فروشگاه را دریافت میکند`,
        ``
      ],
      height:250
    },
    {
      question:'		کارمزد اُتامین ',
      answer:`بعد از تأیید فاکتور و ارسال کالا برای فروشگاه، مبلغ کارمزد اُتامین در پنل تأمین کننده ثبت میشود و طبق یک بازه زمانی مشخص تسویه میشود.
      `,
      active:false,
      items:[],
      height:100


    },
    {
      question:'			تأمین کنندگان چه شرایطی را باید داشته باشند',
      answer:`الزاماً باید سیستم توزیع داشته باشند یا با شرکت پخش انحصاری کار کنند ، مالکیت کالا و برندی که در سیستم ثبت میکنند متعلق به خودشان باشد.
      `
      ,
      active:false,
      items:[],
      height:100

    },
    {
      question:'				برای عضویت در otamin چه هزینهای باید پرداخت شود؟ ',
      answer:`خیر هیچ هزینهای چه از طرف فروشگاه چه تأمین کننده دریافت نمیگردد. ثبت نام در اپ به عنوان فروشگاه و در وب سایت به عنوان تأمین کننده کاملاً رایگان است.
      `
      
      ,
      active:false,
      items:[],
      height:100


    },
    {
      question:'				روشهای سنتی خرید چگونه است؟  ',
      answer:`شرکتها از طریق ویزیتورهای حضوری خود مجموعه یا ویزیتورهای شرکتهای پخش اقدام به بازاریابی میکنند. این اپ روشی مکمل در کنار روشهای سنتی، ویزیت حضوری یا خرید از بنکداران بازار است.
      `
      
      ,
      active:false,
      items:[],
      height:150


    },
    {
      question:'	چرا اُتامین؟',
     answer:'',
     items:[
       `⦁	سهولت استفاده`,
       `⦁	در دسترس بودن `,
       `⦁	امکان سفارش گذاری در هر ساعت شبانه روز `,
       `⦁	امکان اطلاع رسانی سریع و گسترده`,
       `⦁	ارتباط مستقیم فروشگاه با کارخانه `,
       `⦁	رصد لحظه ای سفارشات`,
       `⦁	استعلام لحظهای قیمت تأمین کنندگان`,
       `⦁	امکان دسترسی لحظهای به پروموشنها و تخفیفات فروش تولیدکنندگان `,
       `⦁	همراهی با پیشرفت تکنولوژی و به روز بودن`,
       `⦁	دیده شدن برند تأمین کننده در اپ توسط فروشگاهها برای تأمین کنندگان`,
       `⦁	در صورت عدم حضور ویزیتور در تایم طولانی خودتان بر مبنای نیاز، سفارش ثبت میکنید.`
     ],
     
     active:false,
     height:350
     
    }
  ]
  constructor() { }

  ngOnInit(): void {
window.scrollTo(0,0)

  }
  showHide(i){
    this.faq.map(
      (item,index)=>{
       if(index==i){
         item.active=!item.active;
       }else{
        item.active=false
       }
      }
    )
  }
}
