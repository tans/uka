import Container from "@/components/app/container";

export default function () {
  return (
    <>
      <Container>
        <div className="font-black my-8 text-center">
          UKA
          <div> 开源USDT支付系统</div>
        </div>

        <img
          src="/screenshot.jpg"
          className="w-full rounded-sm shadow border my-4 max-w-96 mx-auto"
        />
        <div className="mt-4 font-black">系统特点：</div>
        <div>1. 开箱默认支持BSC的USDT</div>
        <div>2. 可定制多链多币种</div>
        <div>3. 无需钱包私钥，安全无风险</div>
        <div>4. 免登录, 匿名支付</div>

        <div className="mt-4">无门槛实现全球收款。</div>
        <div className="mt-4 font-black">系统原理</div>
        <div>生成时间周期内金额唯一的订单</div>
        <div>检查链上交易，金额匹配成功即支付成功</div>
        <div>在第三方系统中输入订单兑换码，核销使用</div>
        <div className="mt-4 font-black">适用场景</div>
        <div>软件会员续期</div>

        <div className="font-black mt-4">Demo</div>
        <div>
          <a href="/shop" className="underline">
            收款入口
          </a>
        </div>
        <div>
          <a href="/admin" className="underline">
            管理后台入口
          </a>
        </div>
        <div>admin - 123456</div>

        <div className="mt-4">
          <a
            href="https://github.com/tans/uka"
            className="font-black underline"
          >
            github
          </a>
        </div>
      </Container>
    </>
  );
}
