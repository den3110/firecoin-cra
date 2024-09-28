"use client";
import useLocale from "@/hooks/useLocales";

export default function GoverningLaw() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Luật chi phối</b>
                </h4>
                <p>
                    1. Thỏa thuận này được thực hiện tại quốc gia Belize (sau đây gọi là quốc gia đăng ký Công ty) và
                    được quy định bởi luật của quốc gia đăng ký Công ty. Các dịch vụ theo Thỏa thuận này được cung cấp
                    tại quốc gia đăng ký của Công ty.
                </p>
                <p>
                    2. Khách hàng rõ ràng: a) đồng ý rằng các tòa án của quốc gia đăng ký của Công ty có thẩm quyền
                    riêng để tiến hành bất kỳ thủ tục pháp lý nào liên quan đến Thỏa thuận này; b) tuân theo thẩm quyền
                    của các tòa án của quốc gia đăng ký của Công ty; c) từ bỏ mọi kháng cáo liên quan đến thủ tục tại
                    bất kỳ tòa án nào như vậy; d) đồng ý không đưa ra khiếu nại nào về vị trí của phiên tòa là không
                    thuận tiện và không tuyên bố rằng trạng thái vị trí của phiên tòa không có thẩm quyền pháp lý đối
                    với Khách hàng.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Governing Law</b>
            </h4>
            <p>
                1. This agreement is made in the country of Belize (hereinafter the country of Company registration) and
                is regulated by the law of the country of Company registration. Services under this Agreement are
                provided in the country of Company registration.
            </p>
            <p>
                2. The Client expressly: a) agrees that the courts of the country of the Company’s registration have
                exclusive jurisdiction to conduct any legal proceedings with respect to this Agreement; b) submits to
                the jurisdiction of the courts of the country of the Company’s registration; c) waives any appeals with
                respect to proceedings in any of such courts; d) agrees to make no claims regarding trial’s location as
                non-convenient and not to declare that the trial’s location state has no legal jurisdiction over the
                Client.
            </p>
        </div>
    );
}
