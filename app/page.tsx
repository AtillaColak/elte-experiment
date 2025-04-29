"use client"

import { useEffect, useState } from "react"
import { SlideSet } from "./components/slide-set"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { checkGroup, submitResult } from "@/utils/form-helper"

export default function Home() {
  const [headerBannerUrl, setHeaderBannerUrl] = useState<string | undefined>(undefined)
  const [footerBannerUrl, setFooterBannerUrl] = useState<string | undefined>(undefined)
  const [isControl, setisControl] = useState(false)

  // Handle banner changes from the SlideSet
  const handleBannerChange = (newHeaderBannerUrl?: string, newFooterBannerUrl?: string) => {
    setHeaderBannerUrl(newHeaderBannerUrl)
    setFooterBannerUrl(newFooterBannerUrl)
  }

  useEffect(() => {
    const fetchControlGroup = async () => {
      // Check if the user is in a control group
      const isControlGroup = await checkGroup()
      setisControl(isControlGroup)
    }
    fetchControlGroup()
  }, [])

  const experimentSlides = [
    {
      id: "intro",
      type: "information",
      title: "Anketimize Hoşgeldiniz",
      description: "Lütfen aşağıdaki soruları dürüstçe yanıtlayın",
      content: `
          <p>Merhaba, ben Efe Çakmak, Eötvös Loránd Üniversitesi'nde Psikoloji öğrencisiyim. Bu çalışmaya katıldığınız için teşekkür ederim. Anketin ilişkiler üzerine olduğunu unutmayın. Çalışma yalnızca "Deney Metodları" dersi kapsamında hazırlanmıştır; bilimsel bir araştırma veya yayın amacı taşımamaktadır.</p>
          <br>
          <p>Yanıtlarınız psikoloji alanındaki bilgi birikimimizi artırmak için değerlidir. Katılım tamamen gönüllülük esasına dayanmaktadır ve yanıtlarınız gizli tutulacaktır. Anket birkaç sorudan oluşmakta olup yaklaşık 5-10 dakikanızı alacaktır. Soruların doğru ya da yanlış cevabı yoktur. İstediğiniz anda anketten ayrılabilirsiniz; bu durumda yanıtlarınız kaydedilmeyecektir. Ankete yalnızca 18 yaş ve üzeri katılımcılar katılabilir ve devam ettiğiniz takdirde 18 yaşınızdan büyük olduğunuzu onaylıyorsunuz demektir.</p>
          <br>
          <p>Herhangi bir sorunuz veya endişeniz olursa, çalışmayı yürüten hocam Dr. Mihály Berkics'e <a href="mailto:berkics.mihaly@ppk.elte.hu">berkics.mihaly@ppk.elte.hu</a> adresinden ulaşabilirsiniz.</p>
      `,
      headerBannerUrl: "/neutral-banner.jpg",
      footerBannerUrl: "/neutral-banner.jpg",
    },
    {
      id: "demografik",
      type: "information",
      title: "Demografi",
      description: "Lütfen bu bölümde verilen soruları size en uygun şıkkı seçerek yanıtlayın.",
      content: ``,
      headerBannerUrl: "/neutral-banner.jpg",
      footerBannerUrl: "/neutral-banner.jpg",
    },
    {
      id: "q1",
      type: "question",
      questionType: "integer",
      title: "Kaç yaşındasınız?",
      minValue: 18,
      maxValue: 100,
      entry: "entry.258578541",
      required: true
    },
    {
      id: "q2",
      type: "question",
      questionType: "multiple-choice",
      title: "Cinsiyetiniz nedir?",
      choices: [
        { id: "feature1", text: "Erkek" },
        { id: "feature2", text: "Kadın" },
        { id: "feature3", text: "Cinsiyetsiz" },
        { id: "feature4", text: "Diğer" },
        { id: "feature5", text: "Söylemeyi tercih etmiyor" },
      ],
      required: true
    },
    {
      id: "q3",
      type: "question",
      questionType: "multiple-choice",
      title: "Eğitim seviyeni nedir?",
      choices: [
        { id: "feature1", text: "Lise diplomasından daha az" },
        { id: "feature2", text: "Lise diploması veya eşdeğeri" },
        { id: "feature3", text: "Lisans derecesi" },
        { id: "feature4", text: "Yüksek lisans derecesi" },
        { id: "feature5", text: "Doktora derecesi" },
      ],
      required: true
    },
    {
      id: "q4",
      type: "question",
      questionType: "multiple-choice",
      title: "Etnik kökeniniz nedir?",
      choices: [
        { id: "feature1", text: "Türk" },
        { id: "feature2", text: "Kürt" },
        { id: "feature3", text: "Arap" },
        { id: "feature4", text: "Diğer" },
      ],
    },
    {
      id: "q5",
      type: "question",
      questionType: "multiple-choice",
      title: "Hangi dine mensupsunuz?",
      choices: [
        { id: "feature0", text: "İslamiyet (Hanefi)" },
        { id: "feature1", text: "İslamiyet (Sünni)" },
        { id: "feature2", text: "İslamiyet (Alevi)" },
        { id: "feature3", text: "İslamiyet (Şii ve diğer)" },
        { id: "feature4", text: "Hristiyanlık" },
        { id: "feature5", text: "Diğer" },
      ],
      required: true
    },
    // PREPRIMING
    {
      id: "iliskiler-1",
      type: "information",
      title: "İlişkiler - 1",
      description: "Lütfen bu bölümdeki ifadelere ne kadar katıldığınızı bir ile yedi üzerinden puanlayınız.",
      content: ``,
      headerBannerUrl: `neutral-banner.jpg`,
      footerBannerUrl: `neutral-banner.jpg`,
    },
    {
      id: "ad1",
      type: "popup",
      imageUrl: `neutral_popup.jpg`,
      infoUrl: "https://ads.google.com",
      skipTime: 5,
      required: true
    },
    {
      id: "q6",
      type: "question",
      questionType: "scale",
      title: "Açık ilişkilerin (birden fazla kişiyle rızaya dayalı ilişkiler) sağlıklı olabileceğine inanıyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q7",
      type: "question",
      questionType: "scale",
      title: "Poliamori (birden fazla kişiye aynı anda romantik bağlılık duyulması) bana göre kabul edilebilir bir ilişki biçimidir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q8",
      type: "question",
      questionType: "scale",
      title: "Kadın yakınımın farklı kimlikten (din, mezhep veya ırk) bir bireyle evlenmesini hoş karşılarım.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.1855367148", 
      required: true
    },
    {
      id: "q9",
      type: "question",
      questionType: "scale",
      title: "Aileler, geleneksel olmayan ilişkileri kabul etmekte zorlanır.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q10",
      type: "question",
      questionType: "scale",
      title: "Bir bireyin evlilik dışı ilişki yaşaması ahlaken sorun teşkil etmez.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q11",
      type: "question",
      questionType: "scale",
      title: "Erkekler duygularını açıkça ifade edebildiği ilişkiler sağlıklıdır.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q12",
      type: "question",
      questionType: "scale",
      title: "Kadının evlilikte erkeğe boyun eğmesi gerektiği fikrine katılmıyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q13",
      type: "question",
      questionType: "scale",
      title: "Kendi hayat tarzıma uymasa da farklı ilişki biçimlerine saygı duyarım.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    // PRIMING
    {
      id: "iliskiler-2",
      type: "information",
      title: "İlişkiler - 2",
      description: "Lütfen bu bölümdeki ifadelere ne kadar katıldığınızı bir ile yedi üzerinden puanlayınız.",
      content: ``,
      headerBannerUrl: `${isControl ? "neutral-banner.jpg" : "primed-banner.jpg"}`,
      footerBannerUrl: `${isControl ? "neutral-banner.jpg" : "primed-banner.jpg"}`,
    },
    {
      id: "q14",
      type: "question",
      questionType: "scale",
      title: "İnsanlar, flörtöz ya da bağlanmadan ilişki yaşayan bireyleri genelde ciddiye almaz.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "ad2",
      type: "popup",
      imageUrl: `${isControl ? "neutral_popup.jpg" : "primed-popup.png"}`,
      infoUrl: "https://ads.google.com",
      skipTime: 5,
    },
    {
      id: "q15",
      type: "question",
      questionType: "scale",
      title: "İki kadının romantik ilişki yaşamasını uygun bulmuyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.915106475",
      required: true
    },
    {
      id: "q16",
      type: "question",
      questionType: "scale",
      title: "Yakınım olan birinin aynı cinsiyetten bir bireyle romantik ilişki yaşaması benim için sorun teşkil etmez.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.2000712077",
      required: true
    },
    {
      id: "q17",
      type: "question",
      questionType: "scale",
      title: "Evlilik hakkının eşcinsel çiftlere de tanınması gerektiğini düşünüyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.828228927",
      required: true
    },
    {
      id: "q18",
      type: "question",
      questionType: "scale",
      title: "İki kişinin sevgili olması için ailelerin onayı gereklidir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q19",
      type: "question",
      questionType: "scale",
      title: "LGBTİ+ bireylerin ilişkilerini toplum içinde sergilemesi beni rahatsız eder.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.703948699",
      required: true
    },
    // PRIMING 2
    {
      id: "iliskiler-3",
      type: "information",
      title: "İlişkiler - 3",
      description: "Lütfen bu bölümdeki ifadelere ne kadar katıldığınızı bir ile yedi üzerinden puanlayınız.",
      content: ``,
      headerBannerUrl: `${isControl ? "neutral-banner.jpg" : "primed-banner.jpg"}`,
      footerBannerUrl: `${isControl ? "neutral-banner.jpg" : "primed-banner.jpg"}`,
    },
    {
      id: "ad3",
      type: "popup",
      imageUrl: `${isControl ? "neutral_popup.jpg" : "primed-popup.png"}`,
      infoUrl: "https://ads.google.com",
      skipTime: 5,
    },    
    {
      id: "q20",
      type: "question",
      questionType: "scale",
      title: "İki erkeğin romantik ilişki yaşamasını uygun bulmuyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.2060042492",
      required: true
    },
    {
      id: "q21",
      type: "question",
      questionType: "scale",
      title: "Evli bir çiftin çocuk yapma sorumluluğu vardır.Görücü usülü evlilik iyi bir eş seçme biçimidir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q22",
      type: "question",
      questionType: "scale",
      title: "Toplumda LGBTİ+’nin hoş karşılanması sakıncalı bir durumdur.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.477271740",
      required: true
    },
    {
      id: "q23",
      type: "question",
      questionType: "scale",
      title: "Medyanın insanları LGBTİ+’ya teşvik edebileceğini düşünüyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.116113645",
      required: true
    },
    {
      id: "q24",
      type: "question",
      questionType: "scale",
      title: "Kadının ekonomik özgürlüğü bir ilişkiyi güçlendirir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q25",
      type: "question",
      questionType: "scale",
      title: "Kadınların evlenmeden önce ailesinden onay alması gerektiğine inanıyorum.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q26",
      type: "question",
      questionType: "scale",
      title: "Kadının ilişkide asıl söz sahibi olması ilişkiyi güçlendirir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q27",
      type: "question",
      questionType: "scale",
      title: "Bana göre LGBTİ+ bireyler cinselliklerini fazla ön plana çıkarıyor.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.1197238886",
      required: true
    },
    {
      id: "q28",
      type: "question",
      questionType: "scale",
      title: "Trans bireylerin cinsiyet uyum (değişim) süreçleri kolaylaştırılmalıdır.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.1318972100",
      required: true
    },
    {
      id: "q29",
      type: "question",
      questionType: "scale",
      title: "Bir bireyin birçok farklı ilişki deneyimi yaşaması kişisel gelişimi destekler.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      required: true
    },
    {
      id: "q30",
      type: "question",
      questionType: "scale",
      title: "Trans bireylerin duygusal ve romantik ilişkileri toplum tarafından daha fazla kabul görmelidir.",
      minValue: 1,
      maxValue: 7,
      minLabel: "Kesinlikle katılmıyorum",
      maxLabel: "Kesinlikle katılıyorum",
      entry: "entry.1153949144",
      required: true
    },
  ]

  const handleComplete = async (answers: Record<string, [string, string | number]>) => {
    console.log("Survey completed with answers:", answers)

    const ok = await submitResult(answers);

    console.log("Submission successful:", ok);
    return ok // Return true or false based on submission result
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header bannerUrl={headerBannerUrl} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Logo positioned absolutely within the main section */}
        <div className="absolute top-4 left-4 z-10">
          <img
            src="https://huneducation.com/wp-content/uploads/2023/03/elte_logo.png"
            alt="ELTE Logo"
            className="h-20 w-20"
          />
        </div>

        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden h-[100vh] lg:h-[60vh] mt-24">
          <SlideSet slides={experimentSlides} onComplete={handleComplete} onBannerChange={handleBannerChange} />
        </div>
      </main>

      <Footer bannerUrl={footerBannerUrl} />
    </div>
  )
}
