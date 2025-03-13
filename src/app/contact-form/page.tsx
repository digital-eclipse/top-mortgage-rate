"use client"

import Layout from "@/components/Layout";

const LeadFormPage = () => {

  return (
    <div className="bg-white min-h-screen lg:p-[2vw] w-full h-full ">
        <div>

            <iframe
                      src="https://api.leadconnectorhq.com/widget/form/T9jGcSLh3TtN9WamdiyP"
                      style={{ width: '100%', height: '652px', border: 'none', borderRadius: '3px' }}
                      id="inline-T9jGcSLh3TtN9WamdiyP"
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="leadCollected"
                      data-deactivation-value=""
                      data-form-name="TMR Form"
                      data-height="652"
                      data-layout-iframe-id="inline-T9jGcSLh3TtN9WamdiyP"
                      data-form-id="T9jGcSLh3TtN9WamdiyP"
                      title="TMR Form"
                      scrolling="no"
                    >
            </iframe>
        </div>
    </div>
  );
};

export default LeadFormPage;
