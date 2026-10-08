import React, { useState } from 'react';
import { SchoolSettings, GradeRule, User } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import { Settings, Save, Check, Download, Upload, ShieldCheck, RefreshCw, Award } from 'lucide-react';

interface SettingsManagerProps {
  settings: SchoolSettings;
  currentUser: User;
  onSaveSettings: (settings: SchoolSettings) => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  settings,
  currentUser,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SchoolSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRuleChange = (index: number, field: keyof GradeRule, val: any) => {
    const updated = [...formData.grading_rules];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, grading_rules: updated });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData({ ...formData, logo_url: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadCrestSvg = () => {
    const link = document.createElement('a');
    link.href = '/school_crest.svg';
    link.download = 'Nkroful_Agric_SHS_Official_Crest.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-800" />
            <span>School Institutional Configuration & Grading Scale</span>
          </h2>
          <p className="text-xs text-slate-500">
            Customize official school stationery details, official heraldic crest, headmaster signatures, and continuous assessment ratios.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <Check className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Official School Crest & Emblem Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-serif flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Official School Crest &amp; Heraldic Emblem</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Authentic crest of Nkroful Agric Senior High School used on transcripts, terminal reports, and student portals.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadCrestSvg}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-800" />
                <span>Download Vector Crest (.SVG)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
            {/* Crest Visual Display */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-center space-y-3">
              {formData.logo_url && formData.logo_url.startsWith('data:') ? (
                <img
                  src={formData.logo_url}
                  alt="School Crest"
                  className="w-28 h-32 object-contain drop-shadow-md"
                />
              ) : (
                <SchoolCrest size="xl" showText={false} />
              )}
              <div className="font-serif font-black text-slate-900 text-sm">
                NKROFUL AGRIC SENIOR HIGH
              </div>
              <div className="text-[10px] text-pink-700 font-extrabold uppercase tracking-wider">
                Knowledge &bull; Integrity &bull; Service
              </div>
            </div>

            {/* Heraldic Meaning & Specifications */}
            <div className="md:col-span-2 space-y-3 text-slate-600 text-xs leading-relaxed">
              <div className="font-bold text-slate-800 text-xs">Heraldic Symbols of NASS:</div>
              <ul className="space-y-1.5 text-[11.5px] list-disc pl-4 text-slate-600">
                <li>
                  <strong className="text-slate-800">Gold/Yellow Shield Field:</strong> Represents enduring institutional integrity, warmth, and intellectual enlightenment.
                </li>
                <li>
                  <strong className="text-slate-800">Open Book of Knowledge:</strong> Depicts rigorous scholastic scholarship, academic dedication, and high standard WASSCE preparation.
                </li>
                <li>
                  <strong className="text-slate-800">Laurel Wreath &amp; Green Foliage:</strong> Signifies Western Region fertile soils, agricultural prosperity, and academic achievement.
                </li>
                <li>
                  <strong className="text-slate-800">Crossed Cutlass &amp; Adze:</strong> Honours hands-on agricultural science, practical labour, industrial grit, and nation-building.
                </li>
                <li>
                  <strong className="text-slate-800">Pink Motto Ribbon:</strong> Inscribed with the solemn school motto: <em className="text-slate-900 font-bold">"KNOWLEDGE, INTEGRITY, SERVICE"</em>.
                </li>
              </ul>

              <div className="pt-2 flex items-center gap-3">
                <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold border border-slate-300 cursor-pointer flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Alternate Crest</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {formData.logo_url && formData.logo_url.startsWith('data:') && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo_url: '/school_crest.svg' })}
                    className="text-[11px] text-rose-700 hover:underline cursor-pointer"
                  >
                    Reset to Default Heraldic Crest
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* School Information Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 font-serif">
            Institutional Identity &amp; Letterhead
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">School Official Name *</label>
              <input
                type="text"
                required
                value={formData.school_name}
                onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">School Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">School Motto</label>
              <input
                type="text"
                value={formData.motto}
                onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg italic font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Postal &amp; Geographic Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Telephone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Headmaster Full Name</label>
              <input
                type="text"
                value={formData.headmaster_name}
                onChange={(e) => setFormData({ ...formData, headmaster_name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assistant Headmaster (Academic)</label>
              <input
                type="text"
                value={formData.assistant_head_academic}
                onChange={(e) => setFormData({ ...formData, assistant_head_academic: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Transcript Legal Footer Disclaimer</label>
            <textarea
              rows={2}
              value={formData.transcript_footer}
              onChange={(e) => setFormData({ ...formData, transcript_footer: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Assessment Weightings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 font-serif">
            Continuous Assessment &amp; Examination Weightings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Continuous Class Assessment Ratio (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.assessment_ratio}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFormData({
                    ...formData,
                    assessment_ratio: val,
                    exam_ratio: 100 - val,
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard Ghana Education Service continuous assessment ratio is 30% (or 40%).
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Terminal Examination Ratio (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.exam_ratio}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFormData({
                    ...formData,
                    exam_ratio: val,
                    assessment_ratio: 100 - val,
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard end-of-term examinations ratio is 70% (or 60%). Total = 100%.
              </span>
            </div>
          </div>
        </div>

        {/* WAEC Grading Rules Table */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-800 font-serif">
                WAEC / GES Standard 9-Point Grading Scheme
              </h3>
              <p className="text-[11px] text-slate-500">
                Official WASSCE grading cutoffs configured for automated marks computation.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase font-semibold">
                  <th className="py-2 px-3">Grade</th>
                  <th className="py-2 px-3 text-center">Score Range (%)</th>
                  <th className="py-2 px-3 text-center">Grade Point</th>
                  <th className="py-2 px-3">Official Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {formData.grading_rules.map((rule, idx) => (
                  <tr key={rule.grade} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-bold text-slate-900 font-mono">
                      {rule.grade}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rule.min_score}
                          onChange={(e) => handleRuleChange(idx, 'min_score', Number(e.target.value))}
                          className="w-14 px-2 py-1 border border-slate-300 rounded text-center font-semibold font-mono"
                        />
                        <span className="text-slate-400">&ndash;</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rule.max_score}
                          onChange={(e) => handleRuleChange(idx, 'max_score', Number(e.target.value))}
                          className="w-14 px-2 py-1 border border-slate-300 rounded text-center font-semibold font-mono"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={rule.grade_point}
                        onChange={(e) => handleRuleChange(idx, 'grade_point', Number(e.target.value))}
                        className="w-12 px-2 py-1 border border-slate-300 rounded text-center font-bold font-mono"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={rule.remark}
                        onChange={(e) => handleRuleChange(idx, 'remark', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Save School Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
