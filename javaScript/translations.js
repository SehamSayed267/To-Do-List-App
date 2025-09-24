const translations = {
  en: {
    loginTitle: "Login", 
    registerTitle: "Create New Account",
    firstNamePlaceholder: "First Name",
    lastNamePlaceholder: "Last Name",
    emailPlaceholder: "userName@gmail.com",
    passwordPlaceholder: "*******",
    loginBtn: "Login",
    registerBtn: "Register",
    dontHaveAccount: "Don't have an account?",
    alreadyRegistered: "Already registered?",
    fillAllFields: "Please fill all fields!",
    emailExists: "This email is already registered!",
    userNotFound: "User not found. Please register first.",
    emptyTask: "Please enter a task before adding!",
    todoTitle:"My ToDo List",
    taskPlaceholder:"write your task" ,
    logoutBtn:"Log Out"
    },
    
  ar: {
    registerTitle: "إنشاء حساب جديد",
    loginTitle: "تسجيل الدخول",
    firstNamePlaceholder: "الاسم الأول",
    lastNamePlaceholder: "الاسم الأخير",
    emailPlaceholder: "بريدك الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    loginBtn: "دخول",
    registerBtn: "تسجيل",
    dontHaveAccount: "ليس لديك حساب؟",
    alreadyRegistered: "لديك حساب بالفعل؟",
    fillAllFields: "من فضلك املأ كل الحقول!",
    emailExists: "هذا البريد مسجل بالفعل!",
    userNotFound: "المستخدم غير موجود. برجاء التسجيل أولاً.",
    emptyTask: "!من فضلك ادخل مهمه قبل الاضافة",
    todoTitle:"قائمة مهامي",
    taskPlaceholder:"اكتب مهمتك" ,
    logoutBtn:"تسجيل خروج",
  }
};

const languageSelector = document.querySelector('select');

languageSelector.addEventListener('change', (event) => {
  setLanguage(event.target.value);
  localStorage.setItem('lang', event.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
  languageSelector.value = savedLang;
});

const setLanguage = (language) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");

    if (element.tagName.toLowerCase() === "input" && element.hasAttribute("placeholder")) {
      element.placeholder = translations[language][translationKey];
    } else if (element.tagName.toLowerCase() === "button" || element.tagName.toLowerCase() === "input" && element.type === "submit") {
      element.value = translations[language][translationKey];
    } else {
      element.textContent = translations[language][translationKey];
    }
  });

  document.dir = language === 'ar' ? "rtl" : "ltr";

const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
  if(language === "ar"){
    logoutBtn.textContent = translations[language].logoutBtn; 
    logoutBtn.style.left = "20px";   
    logoutBtn.style.right = "auto";
  } else {
    logoutBtn.textContent = translations[language].logoutBtn; 
    logoutBtn.style.right = "20px";  
    logoutBtn.style.left = "auto"; 
  } 
}

const languageSelector = document.getElementById("langSelect");
if(languageSelector){
  if(language === "ar"){
    languageSelector.style.left = "20px";  
    languageSelector.style.right = "auto";
  } else {
    languageSelector.style.right = "20px"; 
    languageSelector.style.left = "auto";
  }
}

  const msgBox = document.getElementById("msg");
  if (msgBox && msgBox.textContent.trim() !== "") {
    let currentKey = null;
    for (let key in translations.en) {
      if (msgBox.textContent === translations.en[key] ||
          msgBox.textContent === translations.ar[key]) {
        currentKey = key;
        break;
      }
    }
    if (currentKey) {
      msgBox.textContent = translations[language][currentKey];
    }
  }

};


