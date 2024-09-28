"use client";
import useLocale from "@/hooks/useLocales";

export default function ForceMajeure() {
    const locale = localStorage?.getItem("LANG") || "en";

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Trường hợp bất khả kháng</b>
                </h4>
                <p>
                    1. Nếu có đủ căn cứ, Công ty có thể yêu cầu bồi thường các trường hợp bất khả kháng. Sự kiện bất khả
                    kháng bao gồm (nhưng không giới hạn): (a) bất kỳ hành động, sự kiện hoặc sự kiện nào xảy ra (bao gồm
                    nhưng không giới hạn ở bất kỳ cuộc đình công, bạo loạn hoặc xung đột dân sự, hành động khủng bố,
                    chiến tranh, thiên tai, tai nạn, hỏa hoạn, lũ lụt, bão tố, mất điện, gián đoạn hoạt động của thiết
                    bị liên lạc, phần mềm hoặc thiết bị điện tử, hoạt động không chính xác của bất kỳ loại thiết bị hoặc
                    phần mềm nào, sự không ổn định trong dòng báo giá, gián đoạn trong hoạt động hoặc sự không ổn định
                    của nhà cung cấp thanh khoản, v.v.), , theo ý kiến hợp lý của Công ty, đã dẫn đến sự mất ổn định của
                    thị trường hoặc thị trường của một hoặc nhiều tài sản (công cụ); b) việc đình chỉ công việc, thanh
                    lý hoặc đóng cửa bất kỳ thị trường nào hoặc không có bất kỳ sự kiện nào mà Công ty căn cứ vào báo
                    giá, hoặc việc áp đặt các hạn chế hoặc các điều khoản thương mại đặc biệt hoặc phi tiêu chuẩn trên
                    bất kỳ thị trường nào, hoặc đối với bất kỳ sự kiện như vậy.
                </p>
                <p>
                    2. Nếu Công ty đã xác định rằng một sự kiện bất khả kháng xảy ra, Công ty có quyền (không ảnh hưởng
                    đến các quyền khác của Công ty) thực hiện bất kỳ bước nào sau đây mà không cần thông báo trước bằng
                    văn bản và bất kỳ lúc nào: a) hủy bỏ bất kỳ hoặc tất cả giao dịch mà nguyên nhân trực tiếp hoặc gián
                    tiếp do nguyên nhân bất khả kháng; (b) đình chỉ hoặc sửa đổi việc áp dụng một hoặc tất cả các quy
                    định của Thỏa thuận miễn là do trường hợp bất khả kháng khiến Công ty không thể tuân thủ các quy
                    định này; c) thực hiện hoặc ngược lại, không thực hiện bất kỳ hành động nào liên quan đến Công ty,
                    Khách hàng hoặc các khách hàng khác, nếu Công ty cho là phù hợp một cách hợp lý trong các tình
                    huống.
                </p>
                <p>
                    3 Công ty không chịu trách nhiệm đối với việc vi phạm (xả thải không đúng cách) nghĩa vụ nếu các
                    trường hợp bất khả kháng cản trở việc xả thải đó.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Force Majeure</b>
            </h4>
            <p>
                1. If the Company has sufficient grounds, it may claim force majeure events. Force majeure events
                include (without limitation): (a) any action, event or occurrence (including, but not limited to, any
                strike, riots or civil strife, terrorist acts, wars, natural disasters, accidents, fires, floods,
                storms, power outages, interruptions in the operation of communication equipment, software or electronic
                equipment, incorrect operation of any kind of equipment or software, the instability in the quote
                stream, interruptions in the operation of or the instability of liquidity providers, etc.), which, in
                the Company's reasonable opinion, led to the destabilization of the market or the markets for one or
                more assets (instruments); b) the suspension of work, the liquidation or closure of any market or the
                absence of any event on which the Company bases quotes, or the imposition of restrictions or special or
                non-standard terms of trade in any market, or in respect of any such event.
            </p>
            <p>
                2. If the Company has established that a force majeure event occurred, the Company has the right
                (without prejudice to the Company's other rights) to take any of the following steps without prior
                written notification and at any time: a) cancel any or all trades the result of which is directly or
                indirectly caused by force majeure; (b) suspend or amend the application of one or all provisions of the
                Agreement as long as the force majeure event makes it impossible for the Company to comply with these
                provisions; c) take or, on the contrary, not take any action in respect of the Company, the Client or
                other clients, if the Company reasonably deems it appropriate under the circumstances.
            </p>
            <p>
                3 The Company assumes no liability for breach (improper discharge) of obligations if force majeure
                events interfered with that discharge.
            </p>
        </div>
    );
}
