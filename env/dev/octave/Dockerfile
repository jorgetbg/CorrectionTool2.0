FROM mtmiller/octave
COPY ./correction-tool ./opt/corretor/
RUN pip3 install requests
RUN echo 'alias init="python3 /opt/corretor/init_code.py"' >> ~/.bashrc
