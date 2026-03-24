    <script>
        function appHandler() {
            return {
                loading: false,
                result: null,
                toasts: [],
                formData: {
                    subject: '',
                    topic: '',
                    fase: 'E',
                    count: 5,
                    docType: 'ATP'
                },
                showToast(message, type = 'success') {
                    const id = Date.now();
                    this.toasts.push({ id, message, type, show: true });
                    setTimeout(() => {
                        this.toasts = this.toasts.filter(t => t.id !== id);
                    }, 4000);
                },
                formatResult(text) {
                    if(!text) return '';
                    if(typeof text === 'object') return JSON.stringify(text, null, 2);
                    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black my-6">$1</h1>')
                               .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black my-4">$2</h2>');
                },
                async handleGenerate(type) {
                    if(!this.formData.subject) return this.showToast('Harap isi Mata Pelajaran!', 'error');
                    
                    this.loading = true;
                    this.result = null;

                    let prompt = "";
                    let isJson = false;
                    const instruction = "Anda adalah pakar pendidikan Indonesia. Buat dokumen yang baku, rapi, dan sesuai Kurikulum Merdeka.";

                    if(type === 'modul') {
                        prompt = `Buatkan MODUL AJAR lengkap untuk Mapel: ${this.formData.subject}, Topik: ${this.formData.topic}, Fase: ${this.formData.fase}.`;
                    } else if(type === 'soal') {
                        isJson = true;
                        prompt = `Hasilkan ${this.formData.count} soal Pilihan Ganda HOTS untuk Mapel: ${this.formData.subject}, Fase: ${this.formData.fase}. WAJIB JSON: { "soal": [ { "pertanyaan": "...", "opsi": ["A", "B", "C", "D", "E"], "jawabanBenar": "A" } ] }`;
                    } else if(type === 'lkpd') {
                        prompt = `Buatkan LKPD interaktif untuk Mapel: ${this.formData.subject}, Topik: ${this.formData.topic}, Fase: ${this.formData.fase}.`;
                    } else if(type === 'admin') {
                        prompt = `Buatkan dokumen ${this.formData.docType} untuk Mapel: ${this.formData.subject}, Fase: ${this.formData.fase}.`;
                    }

                    try {
                        const response = await fetch('api-proxy.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt, instruction, isJson })
                        });
                        const data = await response.json();
                        
                        // Format respon dari API Google langsung (via PHP)
                        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        
                        if(isJson) {
                            try {
                                this.result = JSON.parse(text.replace(/```json\n?|```/g, "").trim());
                            } catch(e) { this.result = text; }
                        } else {
                            this.result = text;
                        }
                        
                        this.showToast('Dokumen berhasil disusun!');
                    } catch (e) {
                        this.showToast('Terjadi kesalahan. Cek koneksi atau API Key.', 'error');
                    } finally {
                        this.loading = false;
                    }
                },
                copyToClipboard() {
                    const text = typeof this.result === 'object' ? JSON.stringify(this.result) : this.result;
                    navigator.clipboard.writeText(text);
                    this.showToast('Teks berhasil disalin!');
                }
            }
        }
    </script>
</body>
</html>
