import React from 'react';
import { Wrench, Phone, Mail, Clock } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              กำลังบำรุงรักษา
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
              Maintenance Mode
            </h2>
          </div>

          {/* Message */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              ขณะนี้ระบบกำลังอยู่ในระหว่างการบำรุงรักษาเพื่อปรับปรุงประสิทธิภาพและเพิ่มฟีเจอร์ใหม่
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              เราจะกลับมาให้บริการในเร็วๆ นี้ ขออภัยในความไม่สะดวก
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              หากพบปัญหาหรือต้องการความช่วยเหลือ
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-medium text-gray-800">
                  โทร: 083-834-6686
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-base text-gray-600">
                  support@152engineering.com
                </span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">152</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                บริษัท 152 เอ็นจิเนียริ่ง จำกัด
              </span>
            </div>
            <p className="text-sm text-gray-500">
              152 ENGINEERING CO.,LTD
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              เวลาปัจจุบัน: {new Date().toLocaleString('th-TH', {
                timeZone: 'Asia/Bangkok',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
